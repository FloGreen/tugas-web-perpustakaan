function renderStatusBadge(status) {
  if (status === "Dikembalikan") {
    return `<span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1">${status}</span>`;
  }
  if (status === "Dipinjam") {
    return `<span class="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-2 py-1">${status}</span>`;
  }
  return `<span class="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2 py-1">${status}</span>`;
}

function renderTableRows(tbody, rows, emptyMessage = "Belum ada data.") {
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="20" class="text-center text-muted py-4">${emptyMessage}</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.join("");
}

function fillSelectOptions(select, items, valueKey, labelFn, placeholder) {
  if (!select) return;
  const currentValue = select.value;
  select.innerHTML = `<option value="">${placeholder}</option>`;
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[valueKey];
    option.textContent = labelFn(item);
    select.appendChild(option);
  });
  if (currentValue) select.value = currentValue;
}

function renderActionButtons(type, id) {
  return `
    <div class="d-flex gap-1 flex-nowrap">
      <button type="button" class="btn btn-sm btn-outline-primary btn-edit" data-type="${type}" data-id="${id}">Edit</button>
      <button type="button" class="btn btn-sm btn-outline-danger btn-delete" data-type="${type}" data-id="${id}">Hapus</button>
    </div>`;
}

function setupEditDelete(tableBody, type, onEdit, onDelete, onRefresh) {
  if (!tableBody) return;

  tableBody.addEventListener("click", (event) => {
    const editBtn = event.target.closest(".btn-edit");
    const deleteBtn = event.target.closest(".btn-delete");

    if (editBtn) {
      onEdit(editBtn.dataset.id);
      return;
    }

    if (deleteBtn) {
      if (confirm("Yakin ingin menghapus data ini?")) {
        onDelete(deleteBtn.dataset.id);
        onRefresh();
      }
    }
  });
}

function setFormMode(form, editIdInput, submitBtn, isEdit, addLabel, editLabel) {
  if (editIdInput) editIdInput.value = isEdit ? editIdInput.value : "";
  if (submitBtn) submitBtn.textContent = isEdit ? editLabel : addLabel;
  if (!isEdit && form) form.reset();
}
