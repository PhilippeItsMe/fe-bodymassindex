const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const browseBtn = document.getElementById("browse-btn");
const gallery = document.getElementById("gallery");

if (!dropArea || !fileInput || !browseBtn || !gallery) {
  throw new Error("Elements manquants dans le DOM.");
}

const preventDefaults = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

const highlight = () => dropArea.classList.add("is-dragover");
const unhighlight = () => dropArea.classList.remove("is-dragover");

const humanFileSize = (bytes) => {
  if (!Number.isFinite(bytes)) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(size < 10 && index > 0 ? 1 : 0)} ${units[index]}`;
};

const clearGallery = () => {
  gallery.innerHTML = "";
};

const renderFileCard = (file, url) => {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.src = url;
  img.alt = file.name;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `<strong>${file.name}</strong><span>${humanFileSize(
    file.size
  )}</span>`;

  card.appendChild(img);
  card.appendChild(meta);
  gallery.appendChild(card);
};

const handleFiles = (files) => {
  const fileList = Array.from(files).filter((file) =>
    file.type.startsWith("image/")
  );

  if (fileList.length === 0) {
    clearGallery();
    const empty = document.createElement("p");
    empty.textContent = "Aucune image détectée.";
    gallery.appendChild(empty);
    return;
  }

  clearGallery();
  fileList.forEach((file) => {
    const url = URL.createObjectURL(file);
    renderFileCard(file, url);
  });
};

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", (event) => {
  const { files } = event.dataTransfer;
  if (files && files.length) {
    handleFiles(files);
  }
});

fileInput.addEventListener("change", (event) => {
  const { files } = event.target;
  if (files && files.length) {
    handleFiles(files);
  }
});

browseBtn.addEventListener("click", () => {
  fileInput.click();
});