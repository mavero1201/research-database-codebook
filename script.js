'use strict';

let codebookData = null;
let rawData = null;

document.getElementById('codebook-file').addEventListener('change', handleCodebookUpload);
document.getElementById('data-file').addEventListener('change', handleDataUpload);

function handleCodebookUpload() {
    const file = document.getElementById('codebook-file').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            codebookData = parseCSV(e.target.result);
            showStatus('✅ Кодбук загружен! ' + codebookData.length + ' правил');
        } catch (error) {
            showStatus('❌ Ошибка: ' + error.message);
        }
    };
    reader.readAsText(file);
}

function handleDataUpload() {
    const file = document.getElementById('data-file').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            rawData = parseCSV(e.target.result);
            displayDataPreview(rawData);
            showStatus('✅ Данные загружены! ' + rawData.length + ' строк');
        } catch (error) {
            showStatus('❌ Ошибка: ' + error.message);
        }
    };
    reader.readAsText(file);
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j] ? currentLine[j].trim() : '';
        }
        data.push(obj);
    }
    return data;
}

function displayDataPreview(data) {
    if (!data || data.length === 0) return;
    const table = document.getElementById('data-preview');
    const headers = Object.keys(data[0]);
    let html = '<thead><tr>' + headers.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>';
    for (let i = 0; i < Math.min(5, data.length); i++) {
        html += '<tr>' + headers.map(h => '<td>' + (data[i][h] || '') + '</td>').join('') + '</tr>';
    }
    html += '</tbody>';
    table.innerHTML = html;
}

function validateData() {
    if (!codebookData) { showStatus('❌ Загрузите кодбук'); return; }
    if (!rawData) { showStatus('❌ Загрузите данные'); return; }
    let errors = 0, warnings = 0;
    rawData.forEach((row, i) => {
        Object.keys(row).forEach(key => {
            if (!row[key]) warnings++;
        });
    });
    showStatus('✅ Проверка завершена! Ошибок: ' + errors + ', Предупреждений: ' + warnings);
}

function exportData() {
    if (!rawData) { showStatus('❌ Загрузите данные'); return; }
    let csv = Object.keys(rawData[0]).join(',') + '\n';
    rawData.forEach(row => {
        csv += Object.values(row).map(v => '"' + (v || '') + '"').join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'данные_' + new Date().getTime() + '.csv';
    link.click();
    showStatus('✅ Данные скачаны!');
}

function showStatus(msg) {
    const section = document.getElementById('status-section');
    document.getElementById('status-message').textContent = msg;
    section.style.display = 'block';
}
