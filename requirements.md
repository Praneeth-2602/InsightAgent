# 📘 InsightAgent — Requirements Document

## 🧠 Project Overview

**InsightAgent** is a multimodal AI research assistant designed for students, researchers, and professionals. It ingests user questions and files (documents, images, videos, etc.), then autonomously processes them to generate structured, summarized insights using state-of-the-art vision, audio, and language models.

---

## ✅ Use Cases

### 1. 📄 Generic File Summarization
> *“I have a document/image/video and I want a clean, concise summary.”*

- Input: PDF, DOCX, Image (JPG/PNG), Audio/Video (MP3/MP4/WebM)
- Output: Short & long-form summaries
- Optional: Bullet points, TL;DR, visual highlights

---

### 2. 📚 Research Q&A
> *“I uploaded 3 research papers. Now I want to ask: ‘How is reinforcement learning used in robotics?’”*

- Input: 1–5 academic PDFs
- Input 2 (optional): Natural language question
- Output: 
  - Insightful, sourced answer (LLM-based)
  - Relevant excerpts from papers
  - Citations & links to uploaded docs

---

### 3. 🎥 Meeting / Workshop Digest
> *“Here’s a 1-hour meeting video + slide PDF. Summarize the discussion and key action items.”*

- Input: Audio/video + optional supporting docs (slides, PDFs)
- Output:
  - Meeting summary
  - Key decisions
  - Actionable points
  - Speaker-level breakdown (optional)

---

## 🛠️ Functional Requirements

### 📥 File Upload
- [ ] Accept multiple file types: PDF, DOCX, PNG/JPG, MP4, MP3, WebM
- [ ] Show upload preview
- [ ] Detect and route to correct processing pipeline

### 🔧 Backend Processing
- [ ] OCR for image files
- [ ] Whisper or similar transcription for audio/video
- [ ] PDF/DOCX parser
- [ ] Text cleaning + chunking
- [ ] Prompt-based LLM summarization
- [ ] Optional: QA over uploaded context

### 📤 Output Generation
- [ ] Summaries (Short, Long)
- [ ] Answer to question (if asked)
- [ ] Citation list / Source breakdown
- [ ] Download or copy output

### 🎛️ UI & UX
- [ ] Home page with:
  - File upload box
  - Question/goal input
  - Submit button
- [ ] Results page:
  - View summary or answer
  - Toggle detail view
  - Show original files

---

## 📦 Non-Functional Requirements

- Responsive frontend UI (Next.js + Tailwind)
- Scalable backend (Python/FastAPI)
- Async task handling (Celery or BackgroundTasks)
- OpenAI API (GPT-4) or local LLM fallback
- Local file storage or object storage (e.g., Cloudinary/S3)
- Basic auth or local user history (MVP optional)

---

## 🔖 MVP Scope

For v1.0 (2-month plan), focus on:
- PDF + Audio/Video input support
- Generic summarization + QA
- Upload, summarize, get result
- Simple clean UI
- Use GPT-4 API for LLM tasks
- Host locally or on Vercel + Render

---

## 📌 Stretch Features (Post-MVP)

- Chat history & saved briefs
- Chart/Image interpretation (e.g., graphs)
- Web link scraping
- Team/Org-based access
- Multilingual input support

---

## 🗂️ Folder Suggestions

/insightagent-frontend
├── pages/
├── components/
└── utils/

/insightagent-backend
├── app/
│ ├── main.py
│ ├── services/
│ ├── routes/
│ └── llm/
└── requirements.txt


---

> Created on: 2025-05-24  
> Last updated: _[To be updated by you]_  