"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project, ProjectCategory, SiteWords, ScrollingArcConfig } from "@/types";
import { projectCategories } from "@/data/projects";
import CurvedExhibitionArc from "@/components/ui/CurvedExhibitionArc";
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  Plus,
  Trash2,
  Edit3,
  Copy,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Layers,
  Film,
  Type,
  Sliders,
  ShieldCheck,
  Search,
  Video,
  Play,
  X,
} from "lucide-react";

export default function HostPortalPage() {
  const { data, projects, siteWords, scrollingArcConfig, updateData, refreshData, isLoading } =
    usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Active Navigation Tab
  type TabType = "works" | "scrolling" | "words" | "media" | "backup";
  const [activeTab, setActiveTab] = useState<TabType>("works");

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check existing session on load
  useEffect(() => {
    const savedToken = sessionStorage.getItem("anjalsh_host_token");
    if (savedToken === "anjalsh_master_session_active") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/host/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: passcode }),
      });
      const json = await res.json();

      if (json.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("anjalsh_host_token", "anjalsh_master_session_active");
        showToast("Host Master Console Unlocked.");
      } else {
        setAuthError(json.error || "Invalid Master Key. Access Denied.");
      }
    } catch {
      setAuthError("Failed to authenticate with security server.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("anjalsh_host_token");
    setIsAuthenticated(false);
    setPasscode("");
    showToast("Host Portal Locked.");
  };

  // =========================================================================
  // 1. WORKS / PROJECTS STATE & ACTIONS
  // =========================================================================
  const [projectSearch, setProjectSearch] = useState("");
  const [projectFilterCategory, setProjectFilterCategory] = useState<ProjectCategory>("All Works");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Form state for creating / editing a project
  const [formProject, setFormProject] = useState<Partial<Project>>({
    id: "",
    slug: "",
    title: "",
    category: "Photography",
    year: new Date().getFullYear().toString(),
    client: "",
    role: "Filmmaker & Visual Artist",
    shortDescription: "",
    fullDescription: "",
    coverImage: "",
    videoUrl: "",
    featured: false,
    aspectRatio: "16:9",
    tags: [],
    gallery: [],
  });

  const [formTagsString, setFormTagsString] = useState("");
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat =
        projectFilterCategory === "All Works" || p.category === projectFilterCategory;
      const q = projectSearch.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [projects, projectFilterCategory, projectSearch]);

  const openNewProjectModal = () => {
    const newId = `proj-${Date.now().toString().slice(-6)}`;
    setFormProject({
      id: newId,
      slug: "",
      title: "",
      category: "Photography",
      year: new Date().getFullYear().toString(),
      client: "",
      role: "Filmmaker & Visual Artist",
      shortDescription: "",
      fullDescription: "",
      coverImage: "",
      videoUrl: "",
      featured: true,
      aspectRatio: "16:9",
      tags: ["Creative", "Directorial"],
      gallery: [],
    });
    setFormTagsString("Creative, Directorial");
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setFormProject({ ...proj });
    setFormTagsString(proj.tags.join(", "));
    setIsProjectModalOpen(true);
  };

  const handleFileUpload = async (file: File, targetField: "coverImage" | "videoUrl") => {
    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/host/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer anjalsh_master_session_active",
        },
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setFormProject((prev) => ({
          ...prev,
          [targetField]: json.url,
          ...(targetField === "coverImage" && !prev.gallery?.length
            ? { gallery: [{ type: "image", url: json.url, caption: prev.title || "Project visual" }] }
            : {}),
        }));
        showToast(`Uploaded successfully: ${json.filename}`);
      } else {
        alert(json.error || "File upload failed.");
      }
    } catch {
      alert("Network error while uploading file.");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject.title?.trim()) {
      alert("Project title is required.");
      return;
    }

    const autoSlug =
      formProject.slug?.trim() ||
      formProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const parsedTags = formTagsString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const projectToSave: Project = {
      id: formProject.id || `proj-${Date.now().toString().slice(-6)}`,
      slug: autoSlug,
      title: formProject.title.trim(),
      category: (formProject.category as ProjectCategory) || "Photography",
      year: formProject.year || "2024",
      client: formProject.client || "",
      role: formProject.role || "Filmmaker & Visual Artist",
      shortDescription: formProject.shortDescription || formProject.title,
      fullDescription: formProject.fullDescription || formProject.shortDescription || formProject.title,
      coverImage: formProject.coverImage || "/images/photography/anjalsh-portrait.jpg",
      videoUrl: formProject.videoUrl || undefined,
      featured: Boolean(formProject.featured),
      aspectRatio: formProject.aspectRatio || "16:9",
      tags: parsedTags.length > 0 ? parsedTags : ["Creative"],
      gallery:
        formProject.gallery && formProject.gallery.length > 0
          ? formProject.gallery
          : [
              {
                type: formProject.videoUrl ? "video" : "image",
                url: formProject.videoUrl || formProject.coverImage || "/images/photography/anjalsh-portrait.jpg",
                caption: formProject.title,
              },
            ],
    };

    let updatedProjects: Project[];
    if (editingProject) {
      updatedProjects = projects.map((p) => (p.id === editingProject.id ? projectToSave : p));
    } else {
      updatedProjects = [projectToSave, ...projects];
    }

    const success = await updateData({ projects: updatedProjects });
    if (success) {
      showToast(editingProject ? "Project updated successfully!" : "New project published!");
      setIsProjectModalOpen(false);
    } else {
      alert("Failed to save project. Check console or connection.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to permanently remove this project?")) return;
    const updatedProjects = projects.filter((p) => p.id !== id);
    // Also remove from arc if present
    const updatedArcIds = scrollingArcConfig.selectedProjectIds.filter((pid) => pid !== id);

    const success = await updateData({
      projects: updatedProjects,
      scrollingArcConfig: {
        ...scrollingArcConfig,
        selectedProjectIds: updatedArcIds,
      },
    });

    if (success) {
      showToast("Project deleted.");
    }
  };

  const toggleFeatured = async (project: Project) => {
    const updated = projects.map((p) =>
      p.id === project.id ? { ...p, featured: !p.featured } : p
    );
    await updateData({ projects: updated });
    showToast(`"${project.title}" ${!project.featured ? "marked as Featured" : "unmarked"}`);
  };

  // =========================================================================
  // 2. SCROLLING PAGE CUSTOMIZER (CURVED EXHIBITION ARC)
  // =========================================================================
  const [arcConfigForm, setArcConfigForm] = useState<ScrollingArcConfig>(scrollingArcConfig);

  useEffect(() => {
    setArcConfigForm(scrollingArcConfig);
  }, [scrollingArcConfig]);

  const toggleProjectInArc = (projectId: string) => {
    setArcConfigForm((prev) => {
      const exists = prev.selectedProjectIds.includes(projectId);
      const nextIds = exists
        ? prev.selectedProjectIds.filter((id) => id !== projectId)
        : [...prev.selectedProjectIds, projectId];
      return { ...prev, selectedProjectIds: nextIds };
    });
  };

  const moveArcProjectOrder = (index: number, direction: "up" | "down") => {
    const ids = [...arcConfigForm.selectedProjectIds];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= ids.length) return;
    const temp = ids[index];
    ids[index] = ids[targetIdx];
    ids[targetIdx] = temp;
    setArcConfigForm((prev) => ({ ...prev, selectedProjectIds: ids }));
  };

  const handleSaveArcConfig = async () => {
    const success = await updateData({ scrollingArcConfig: arcConfigForm });
    if (success) {
      showToast("Curved Scrolling Arc settings synchronized!");
    } else {
      alert("Failed to save arc settings.");
    }
  };

  // =========================================================================
  // 3. SITE WORDS & TEXTS FORM
  // =========================================================================
  const [wordsForm, setWordsForm] = useState<SiteWords>(siteWords);

  useEffect(() => {
    setWordsForm(siteWords);
  }, [siteWords]);

  const handleSaveWords = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateData({ siteWords: wordsForm });
    if (success) {
      showToast("Site text, bio, and headlines successfully updated!");
    } else {
      alert("Failed to save words.");
    }
  };

  // =========================================================================
  // 4. DIRECT MEDIA UPLOADS
  // =========================================================================
  const [uploadedFilesList, setUploadedFilesList] = useState<{ url: string; name: string }[]>([]);
  const [directUploading, setDirectUploading] = useState(false);

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setDirectUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/host/upload", {
          method: "POST",
          headers: { Authorization: "Bearer anjalsh_master_session_active" },
          body: formData,
        });

        const json = await res.json();
        if (json.success && json.url) {
          setUploadedFilesList((prev) => [{ url: json.url, name: json.filename }, ...prev]);
        }
      }
      showToast("Media files uploaded successfully!");
    } catch {
      alert("Upload failed.");
    } finally {
      setDirectUploading(false);
    }
  };

  // =========================================================================
  // 5. BACKUP & RESTORE
  // =========================================================================
  const handleDownloadBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anjalsh-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup JSON downloaded.");
  };

  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.projects && parsed.siteWords) {
          if (confirm("Restore this backup? This will overwrite your current site data.")) {
            const success = await updateData(parsed);
            if (success) {
              showToast("Backup restored successfully!");
            }
          }
        } else {
          alert("Invalid backup JSON format.");
        }
      } catch {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // =========================================================================
  // AUTHENTICATION SCREEN (LOCKED VIEW)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 bg-[#0A0D12] text-[#F8FAFC]">
        {/* Subtle Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#161D2A] border border-[#222C3D] shadow-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shadow-lg shadow-accent/20">
              <Lock className="w-7 h-7 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-semibold">
                RESTRICTED ACCESS
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                ANJALSH® HOST PORTAL
              </h1>
              <p className="text-xs font-mono text-[#94A3B8] max-w-xs mx-auto">
                Private editorial suite. Enter your Master Key to manage works, customize the scrolling arc, and update site text.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
                Host Master Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  required
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white placeholder-[#94A3B8]/40 text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] font-mono text-[#94A3B8]/70">
                Default Master Key: <code className="text-accent font-bold">anjalsh2025</code>
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs font-mono flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{authLoading ? "Authenticating..." : "Unlock Host Studio"}</span>
            </button>
          </form>

          {/* Return to Public Website */}
          <div className="text-center pt-2 border-t border-[#222C3D]">
            <Link
              href="/"
              className="text-xs font-mono text-[#94A3B8] hover:text-accent inline-flex items-center space-x-1.5 transition-colors"
            >
              <span>&larr; Return to Live Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // HOST STUDIO CONSOLE (AUTHENTICATED VIEW)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0A0D12] text-[#F8FAFC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-accent text-white text-xs font-mono font-medium shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Host Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0D12]/95 backdrop-blur-md border-b border-[#222C3D] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="font-heading font-black text-xl tracking-tight text-white">
              ANJALSH<sup className="text-accent text-xs">®</sup>
            </span>
            <span className="text-[#222C3D]">/</span>
            <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/40 text-[11px] font-mono text-accent font-semibold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span>HOST STUDIO CONSOLE</span>
            </span>
          </div>

          {/* Quick Actions & Exit */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#161D2A] border border-[#222C3D] text-[#94A3B8] hover:text-white hover:border-accent transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleDownloadBackup}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#161D2A] border border-[#222C3D] text-[#94A3B8] hover:text-white transition-colors"
              title="Download backup file of your entire portfolio"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/40 border border-red-900/60 text-red-300 hover:bg-red-900/50 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock & Exit</span>
            </button>
          </div>
        </div>

        {/* Studio Subtabs */}
        <div className="max-w-7xl mx-auto flex items-center space-x-2 pt-4 overflow-x-auto pb-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab("works")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activeTab === "works"
                ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                : "text-[#94A3B8] hover:text-white hover:bg-[#161D2A]"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Works & Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("scrolling")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activeTab === "scrolling"
                ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                : "text-[#94A3B8] hover:text-white hover:bg-[#161D2A]"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Scrolling Arc Page</span>
          </button>

          <button
            onClick={() => setActiveTab("words")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activeTab === "words"
                ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                : "text-[#94A3B8] hover:text-white hover:bg-[#161D2A]"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Site Words & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activeTab === "media"
                ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                : "text-[#94A3B8] hover:text-white hover:bg-[#161D2A]"
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Direct Media Uploader</span>
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activeTab === "backup"
                ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                : "text-[#94A3B8] hover:text-white hover:bg-[#161D2A]"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Backup</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: WORKS & PROJECTS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === "works" && (
          <div className="space-y-6">
            {/* Top Bar with Project Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#161D2A] border border-[#222C3D]">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
                  Creative Portfolio Archive ({projects.length} Works)
                </h2>
                <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
                  100% Authentic Works &bull; Zero Demo Photos &bull; Add, edit, or upload new projects below.
                </p>
              </div>

              <button
                onClick={openNewProjectModal}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-accent text-white text-xs font-mono tracking-wider font-semibold uppercase hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Work</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2">
              {/* Category Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
                {projectCategories.map((cat) => {
                  const isActive = projectFilterCategory === cat;
                  const count =
                    cat === "All Works"
                      ? projects.length
                      : projects.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setProjectFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                        isActive
                          ? "bg-accent text-white font-semibold"
                          : "bg-[#161D2A] text-[#94A3B8] hover:text-white border border-[#222C3D]"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative shrink-0 w-full md:w-64">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search works..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161D2A] border border-[#222C3D] text-white text-xs font-mono placeholder-[#94A3B8]/50 focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Projects Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p) => {
                const inArc = scrollingArcConfig.selectedProjectIds.includes(p.id);

                return (
                  <div
                    key={p.id}
                    className="flex flex-col justify-between rounded-2xl bg-[#161D2A] border border-[#222C3D] overflow-hidden group hover:border-accent/60 transition-colors"
                  >
                    <div>
                      {/* Thumbnail with Overlay Badges */}
                      <div className="relative aspect-[16/10] bg-[#0A0D12] overflow-hidden">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161D2A] via-transparent to-transparent opacity-80" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-[#0A0D12]/80 backdrop-blur-md text-[10px] font-mono text-white border border-[#222C3D]">
                            {p.category}
                          </span>
                          {p.featured && (
                            <span className="px-2 py-0.5 rounded bg-accent text-[10px] font-mono text-white font-bold">
                              FEATURED
                            </span>
                          )}
                          {inArc && (
                            <span className="px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-mono text-white font-bold">
                              IN ARC
                            </span>
                          )}
                        </div>

                        {p.videoUrl && (
                          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-accent text-white text-[10px] font-mono font-bold flex items-center space-x-1">
                            <Play className="w-2.5 h-2.5 fill-white" />
                            <span>VIDEO</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                          <span className="text-accent font-semibold">{p.year}</span>
                          <span>{p.role}</span>
                        </div>
                        <h3 className="font-heading text-base font-bold text-white leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#94A3B8] font-light line-clamp-2 leading-relaxed">
                          {p.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-4 pt-0 border-t border-[#222C3D]/60 flex items-center justify-between text-xs font-mono mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFeatured(p)}
                          className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                            p.featured
                              ? "bg-accent/20 text-accent font-semibold border border-accent/40"
                              : "bg-[#0A0D12] text-[#94A3B8] border border-[#222C3D] hover:text-white"
                          }`}
                          title="Toggle show on homepage top featured grid"
                        >
                          {p.featured ? "★ Featured" : "☆ Feature"}
                        </button>

                        <button
                          onClick={() => toggleProjectInArc(p.id)}
                          className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                            inArc
                              ? "bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/40"
                              : "bg-[#0A0D12] text-[#94A3B8] border border-[#222C3D] hover:text-white"
                          }`}
                          title="Toggle show in 3D Curved Arc"
                        >
                          {inArc ? "✓ In Arc" : "+ Add to Arc"}
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditProjectModal(p)}
                          className="p-1.5 rounded-lg bg-[#0A0D12] border border-[#222C3D] text-[#94A3B8] hover:text-accent hover:border-accent transition-colors"
                          title="Edit project details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-[#0A0D12] border border-[#222C3D] text-[#94A3B8] hover:text-red-400 hover:border-red-400 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SCROLLING PAGE CUSTOMIZER (CURVED EXHIBITION ARC) */}
        {/* ========================================================================= */}
        {activeTab === "scrolling" && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#161D2A] border border-[#222C3D] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-accent" />
                    <span>Customize 3D Curved Exhibition Arc</span>
                  </h2>
                  <p className="text-xs font-mono text-[#94A3B8] mt-1">
                    Control the projects, order, speed, and title of the rotating 3D arc displayed on the homepage.
                  </p>
                </div>

                <button
                  onClick={handleSaveArcConfig}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-accent-hover shadow-lg shadow-accent/25"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Arc Settings</span>
                </button>
              </div>

              {/* Arc Settings Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-[#222C3D] text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Section Badge</label>
                  <input
                    type="text"
                    value={arcConfigForm.badge}
                    onChange={(e) =>
                      setArcConfigForm({ ...arcConfigForm, badge: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Scroll Speed</label>
                  <select
                    value={arcConfigForm.speed}
                    onChange={(e) =>
                      setArcConfigForm({
                        ...arcConfigForm,
                        speed: e.target.value as "slow" | "normal" | "fast",
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  >
                    <option value="slow">Slow (Cinematic Glide)</option>
                    <option value="normal">Normal (Smooth Loop)</option>
                    <option value="fast">Fast (Dynamic Scroll)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Auto-Scroll Direction</label>
                  <select
                    value={arcConfigForm.direction || "left"}
                    onChange={(e) =>
                      setArcConfigForm({
                        ...arcConfigForm,
                        direction: e.target.value as "left" | "right",
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  >
                    <option value="left">Left-to-Right Loop</option>
                    <option value="right">Right-to-Left Loop</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reorder and Project Selector for Arc */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Reorder Arc Cards */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-white">
                    Arc Sequence ({arcConfigForm.selectedProjectIds.length} Projects in Rotation)
                  </h3>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    Use arrows to reorder
                  </span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {arcConfigForm.selectedProjectIds.map((id, idx) => {
                    const proj = projects.find((p) => p.id === id);
                    if (!proj) return null;

                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#161D2A] border border-[#222C3D] text-xs font-mono"
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <span className="text-accent font-bold w-6">{idx + 1}.</span>
                          <div className="w-10 h-8 relative rounded overflow-hidden shrink-0 bg-[#0A0D12]">
                            <Image
                              src={proj.coverImage}
                              alt={proj.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="truncate">
                            <span className="text-white font-medium block truncate">
                              {proj.title}
                            </span>
                            <span className="text-[10px] text-[#94A3B8] uppercase">
                              {proj.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            onClick={() => moveArcProjectOrder(idx, "up")}
                            disabled={idx === 0}
                            className="p-1 rounded bg-[#0A0D12] text-[#94A3B8] hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveArcProjectOrder(idx, "down")}
                            disabled={idx === arcConfigForm.selectedProjectIds.length - 1}
                            className="p-1 rounded bg-[#0A0D12] text-[#94A3B8] hover:text-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleProjectInArc(id)}
                            className="p-1 rounded bg-red-950/40 text-red-300 hover:bg-red-900/60 ml-2"
                            title="Remove from Arc"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Add Other Projects to Arc */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-white">
                    Available Projects to Add
                  </h3>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    Click to add to rotation
                  </span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {projects
                    .filter((p) => !arcConfigForm.selectedProjectIds.includes(p.id))
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#161D2A]/60 border border-[#222C3D] text-xs font-mono"
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <div className="w-10 h-8 relative rounded overflow-hidden shrink-0 bg-[#0A0D12]">
                            <Image
                              src={p.coverImage}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="truncate">
                            <span className="text-white font-medium block truncate">{p.title}</span>
                            <span className="text-[10px] text-[#94A3B8] uppercase">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleProjectInArc(p.id)}
                          className="px-3 py-1 rounded bg-accent/20 border border-accent/40 text-accent text-xs font-mono hover:bg-accent hover:text-white transition-colors"
                        >
                          + Add to Arc
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Live Interactive Preview */}
            <div className="pt-6 border-t border-[#222C3D] space-y-3">
              <span className="text-xs font-mono uppercase text-accent font-semibold tracking-wider block">
                Live Interactive Arc Preview
              </span>
              <div className="rounded-2xl border border-[#222C3D] bg-[#0A0D12] overflow-hidden p-4">
                <CurvedExhibitionArc
                  projects={projects}
                  config={arcConfigForm}
                  onSelectProject={() => {}}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SITE WORDS & BIO FORM */}
        {/* ========================================================================= */}
        {activeTab === "words" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#161D2A] border border-[#222C3D] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white flex items-center space-x-2">
                    <Type className="w-5 h-5 text-accent" />
                    <span>Editorial Words, Headlines & Biography</span>
                  </h2>
                  <p className="text-xs font-mono text-[#94A3B8] mt-1">
                    Edit the texts, headline, professional title, and bio across the entire portfolio.
                  </p>
                </div>

                <button
                  onClick={handleSaveWords}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-accent text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-accent-hover shadow-lg shadow-accent/25"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Words</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveWords} className="space-y-6 pt-4 border-t border-[#222C3D] text-xs font-mono">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[#94A3B8] uppercase block">
                      Main Tagline (Displayed in Hero Headline)
                    </label>
                    <input
                      type="text"
                      value={wordsForm.tagline}
                      onChange={(e) => setWordsForm({ ...wordsForm, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#94A3B8] uppercase block">
                      Professional Title / Subtitle
                    </label>
                    <input
                      type="text"
                      value={wordsForm.profession}
                      onChange={(e) => setWordsForm({ ...wordsForm, profession: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#94A3B8] uppercase block">Location</label>
                    <input
                      type="text"
                      value={wordsForm.location}
                      onChange={(e) => setWordsForm({ ...wordsForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#94A3B8] uppercase block">
                      Hero Pill Badge
                    </label>
                    <input
                      type="text"
                      value={wordsForm.badge}
                      onChange={(e) => setWordsForm({ ...wordsForm, badge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#94A3B8] uppercase block">Availability Status</label>
                  <input
                    type="text"
                    value={wordsForm.availabilityStatus}
                    onChange={(e) =>
                      setWordsForm({ ...wordsForm, availabilityStatus: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#94A3B8] uppercase block">
                    Positioning Statement (Hero & Intro)
                  </label>
                  <textarea
                    rows={3}
                    value={wordsForm.bioPositioning}
                    onChange={(e) =>
                      setWordsForm({ ...wordsForm, bioPositioning: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#94A3B8] uppercase block">
                    Mission Statement (About Section Quote)
                  </label>
                  <textarea
                    rows={2}
                    value={wordsForm.bioMission}
                    onChange={(e) =>
                      setWordsForm({ ...wordsForm, bioMission: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#94A3B8] uppercase block">
                    Full Narrative Biography
                  </label>
                  <textarea
                    rows={5}
                    value={wordsForm.bioFull}
                    onChange={(e) => setWordsForm({ ...wordsForm, bioFull: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <label className="text-[#94A3B8] uppercase block">Contact Email</label>
                    <input
                      type="email"
                      value={wordsForm.contactEmail}
                      onChange={(e) =>
                        setWordsForm({ ...wordsForm, contactEmail: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#94A3B8] uppercase block">Contact Phone / Location</label>
                    <input
                      type="text"
                      value={wordsForm.contactPhone}
                      onChange={(e) =>
                        setWordsForm({ ...wordsForm, contactPhone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-accent text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-accent-hover shadow-lg shadow-accent/25"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DIRECT MEDIA UPLOADER */}
        {/* ========================================================================= */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#161D2A] border border-[#222C3D] space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent">
                <UploadCloud className="w-8 h-8 stroke-[1.75]" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="font-heading text-2xl font-bold text-white">
                  Direct Media Asset Uploader
                </h2>
                <p className="text-xs font-mono text-[#94A3B8]">
                  Upload high-resolution photography (JPG, PNG, WEBP) or cinematic video reels (MP4, MOV). Assets are saved locally to <code className="text-accent">/public/uploads/</code> with permanent URLs.
                </p>
              </div>

              <label className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-accent text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-accent-hover transition-all cursor-pointer shadow-lg shadow-accent/30">
                <UploadCloud className="w-4 h-4" />
                <span>{directUploading ? "Uploading..." : "Select Media Files"}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleDirectUpload}
                  disabled={directUploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* List of Uploaded Assets in this session */}
            {uploadedFilesList.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-heading text-sm font-bold text-white">
                  Recently Uploaded Assets ({uploadedFilesList.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedFilesList.map((item) => (
                    <div
                      key={item.url}
                      className="p-4 rounded-xl bg-[#161D2A] border border-[#222C3D] flex items-center justify-between gap-3 text-xs font-mono"
                    >
                      <span className="truncate text-white">{item.name}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          showToast("Copied URL to clipboard!");
                        }}
                        className="px-2.5 py-1 rounded bg-accent/20 text-accent hover:bg-accent hover:text-white shrink-0 flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SECURITY & BACKUP */}
        {/* ========================================================================= */}
        {activeTab === "backup" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-[#161D2A] border border-[#222C3D] space-y-4">
              <h2 className="font-heading text-lg font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Security & Master Key</span>
              </h2>
              <p className="text-xs font-mono text-[#94A3B8]">
                Your Host Master Key protects this portal from unauthorized edits. To change the password, update <code className="text-accent">HOST_PASSWORD</code> in your environment or enter your preferred key.
              </p>
              <div className="p-3 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-xs font-mono text-[#94A3B8]">
                Current Active Key: <span className="text-accent font-bold">anjalsh2025</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#161D2A] border border-[#222C3D] space-y-4">
              <h2 className="font-heading text-lg font-bold text-white flex items-center space-x-2">
                <Download className="w-5 h-5 text-accent" />
                <span>Portfolio Data Backup & Restore</span>
              </h2>
              <p className="text-xs font-mono text-[#94A3B8]">
                Download a complete JSON snapshot of all your projects, words, and scrolling settings. You can restore this file at any time.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleDownloadBackup}
                  className="px-6 py-3 rounded-xl bg-accent text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>

                <label className="px-6 py-3 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-[#94A3B8] hover:text-white hover:border-accent font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore from Backup</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestoreBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* ADD / EDIT PROJECT MODAL */}
      {/* ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-[#161D2A] border border-[#222C3D] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#222C3D] pb-4">
              <h2 className="font-heading text-xl font-bold text-white">
                {editingProject ? "Edit Project Details" : "Publish New Creative Work"}
              </h2>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formProject.title || ""}
                    onChange={(e) => setFormProject({ ...formProject, title: e.target.value })}
                    placeholder="e.g. Nocturnal Cinema"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Category</label>
                  <select
                    value={formProject.category || "Photography"}
                    onChange={(e) =>
                      setFormProject({
                        ...formProject,
                        category: e.target.value as ProjectCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  >
                    {projectCategories
                      .filter((c) => c !== "All Works")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Year</label>
                  <input
                    type="text"
                    value={formProject.year || "2024"}
                    onChange={(e) => setFormProject({ ...formProject, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase">Client / Brand</label>
                  <input
                    type="text"
                    value={formProject.client || ""}
                    onChange={(e) => setFormProject({ ...formProject, client: e.target.value })}
                    placeholder="e.g. Commercial Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#94A3B8] uppercase">Role</label>
                  <input
                    type="text"
                    value={formProject.role || ""}
                    onChange={(e) => setFormProject({ ...formProject, role: e.target.value })}
                    placeholder="e.g. Director & Cinematographer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Media Upload Fields */}
              <div className="p-4 rounded-2xl bg-[#0A0D12] border border-[#222C3D] space-y-4">
                <span className="text-[11px] font-mono text-accent uppercase font-semibold block">
                  Media Assets (Photo & Video)
                </span>

                {/* Cover Image */}
                <div className="space-y-2">
                  <label className="text-[#94A3B8] uppercase block">
                    Cover Photo (Upload or Enter URL)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formProject.coverImage || ""}
                      onChange={(e) =>
                        setFormProject({ ...formProject, coverImage: e.target.value })
                      }
                      placeholder="/images/... or /uploads/..."
                      className="w-full px-3 py-2 rounded-xl bg-[#161D2A] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-xs"
                    />
                    <label className="px-4 py-2 rounded-xl bg-accent text-white font-semibold cursor-pointer shrink-0 hover:bg-accent-hover transition-colors">
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "coverImage");
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Video URL */}
                <div className="space-y-2">
                  <label className="text-[#94A3B8] uppercase block">
                    Video Reel URL (Optional for Video Works)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formProject.videoUrl || ""}
                      onChange={(e) =>
                        setFormProject({ ...formProject, videoUrl: e.target.value })
                      }
                      placeholder="/videos/... or /uploads/..."
                      className="w-full px-3 py-2 rounded-xl bg-[#161D2A] border border-[#222C3D] text-white focus:outline-none focus:border-accent text-xs"
                    />
                    <label className="px-4 py-2 rounded-xl bg-[#161D2A] border border-[#222C3D] text-white font-semibold cursor-pointer shrink-0 hover:border-accent transition-colors">
                      <span>Upload Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "videoUrl");
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Short & Full Description */}
              <div className="space-y-1.5">
                <label className="text-[#94A3B8] uppercase">Short Editorial Description</label>
                <textarea
                  rows={2}
                  value={formProject.shortDescription || ""}
                  onChange={(e) =>
                    setFormProject({ ...formProject, shortDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#94A3B8] uppercase">Full Description (Case Study)</label>
                <textarea
                  rows={3}
                  value={formProject.fullDescription || ""}
                  onChange={(e) =>
                    setFormProject({ ...formProject, fullDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-[#94A3B8] uppercase">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTagsString}
                  onChange={(e) => setFormTagsString(e.target.value)}
                  placeholder="Cinematography, DaVinci Resolve, Directorial"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formProject.featured)}
                    onChange={(e) =>
                      setFormProject({ ...formProject, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-accent bg-[#0A0D12] border-[#222C3D]"
                  />
                  <span className="text-white">Featured Project (Homepage Grid)</span>
                </label>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222C3D]">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0A0D12] border border-[#222C3D] text-[#94A3B8] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading || isUploadingMedia}
                  className="px-7 py-2.5 rounded-xl bg-accent text-white font-semibold uppercase tracking-wider hover:bg-accent-hover shadow-lg shadow-accent/25 disabled:opacity-50"
                >
                  {editingProject ? "Update Project" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
