document.getElementById('servicePhotos').addEventListener('change', previewPhotos);

function previewPhotos() {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = ''; // Limpar a visualização anterior

    const files = document.getElementById('servicePhotos').files;

    if (files.length > 20) {
        alert('Você pode enviar no máximo 20 fotos.');
        return;
    }

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100px'; // Limite máximo de largura
            img.style.maxHeight = '100px'; // Limite máximo de altura
            img.style.margin = '5px';
            img.style.display = 'inline-block'; // Exibição em linha para uma organização mais compacta
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar o conteúdo do formulário ao PDF
    doc.setFontSize(18);
    doc.text('Relatório Diário de Obra', 20, 20);

    doc.setFontSize(14);
    doc.text('Dados do Projeto', 20, 30);
    doc.setFontSize(12);
    doc.text(`Nome do Projeto: ${document.getElementById('projectName').value}`, 20, 40);
    doc.text(`ID do Projeto: ${document.getElementById('projectID').value}`, 20, 50);
    doc.text(`Localização: ${document.getElementById('location').value}`, 20, 60);

    doc.setFontSize(14);
    doc.text('Dados do Relatório', 20, 70);
    doc.setFontSize(12);
    doc.text(`Data do Relatório: ${document.getElementById('reportDate').value}`, 20, 80);
    doc.text(`Nome do Responsável: ${document.getElementById('responsibleName').value}`, 20, 90);
    doc.text(`Cargo: ${document.getElementById('role').value}`, 20, 100);

    doc.setFontSize(14);
    doc.text('Detalhes do Trabalho', 20, 110);
    doc.setFontSize(12);
    doc.text(`Descrição do Trabalho: ${document.getElementById('workDescription').value}`, 20, 120);
    doc.text(`Materiais Utilizados: ${document.getElementById('materialsUsed').value}`, 20, 130);
    doc.text(`Equipe e Funcionários Presentes: ${document.getElementById('teamMembers').value}`, 20, 140);
    doc.text(`Horário de Início: ${document.getElementById('startTime').value}`, 20, 150);
    doc.text(`Horário de Término: ${document.getElementById('endTime').value}`, 20, 160);

    doc.setFontSize(14);
    doc.text('Observações', 20, 170);
    doc.setFontSize(12);
    doc.text(`Observações Adicionais: ${document.getElementById('observations').value}`, 20, 180);

    // Adicionar fotos ao PDF em uma única página
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Fotos do Serviço', 20, 20);

    const photoPreview = document.getElementById('photoPreview');
    const images = photoPreview.getElementsByTagName('img');

    const imagesPerRow = 4; // Número de imagens por linha
    const imageWidth = 50; // Largura das imagens
    const imageHeight = 80; // Altura das imagens
    const margin = 5; // Margem entre imagens
    const startX = 20; // Posição X inicial
    let xOffset = startX;
    let yOffset = 30; // Posição Y inicial

    Array.from(images).forEach((img, index) => {
        if (index > 0 && index % imagesPerRow === 0) { // Mudar de linha após atingir o número de imagens por linha
            xOffset = startX;
            yOffset += imageHeight + margin; // Atualizar a posição vertical
        }

        const imgData = img.src;
        doc.addImage(imgData, 'PNG', xOffset, yOffset, imageWidth, imageHeight); // Adicionar imagem
        xOffset += imageWidth + margin; // Atualizar a posição horizontal
    });

    // Baixar o PDF
    doc.save('relatorio_diario_obra.pdf');
}