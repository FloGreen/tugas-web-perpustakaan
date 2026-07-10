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
  select.innerHTML = `<option value="">${placeholder}</option>`;
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[valueKey];
    option.textContent = labelFn(item);
    select.appendChild(option);
  });
}
