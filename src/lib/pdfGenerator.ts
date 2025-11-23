// Improved PDF generation with professional design
export function generateIQCertificatePDF(result: any) {
    const doc = new jsPDF();

    // Colors
    const primaryBlue = [15, 23, 42] as const;
    const secondaryGreen = [16, 185, 129] as const;
    const lightGray = [156, 163, 175] as const;

    //Background
    doc.setFillColor(249, 250, 251);
    doc.rect(0, 0, 210, 297, 'F');

    // Header Banner
    doc.setFillColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
    doc.rect(0, 0, 210, 50, 'F');

    // IQCheck Logo/Title
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('IQCheck', 105, 25, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Certificado Oficial de Coeficiente Intelectual', 105, 38, { align: 'center' });

    // Certificate ID
    doc.setFontSize(8);
    doc.text(`ID: ${result.sessionId || 'N/A'}`, 105, 45, { align: 'center' });

    // Date
    doc.setFontSize(10);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}`, 105, 65, { align: 'center' });

    // Main IQ Score Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 80, 130, 50, 5, 5, 'F');

    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.text(`${result.iq}`, 105, 110, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
    doc.text(result.classification, 105, 122, { align: 'center' });

    // Percentile
    doc.setFontSize(11);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text(`Percentil: Superior al ${result.percentile}% de la población`, 105, 135, { align: 'center' });

    // Divider
    doc.setDrawColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
    doc.setLineWidth(0.5);
    doc.line(30, 150, 180, 150);

    // Category Breakdown Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.text('Desglose por Categorías', 105, 165, { align: 'center' });

    // Categories with progress bars
    const categories: Record<string, string> = {
        logica: 'Lógica Matemática',
        memoria: 'Memoria Visual',
        patrones: 'Reconocimiento de Patrones',
        velocidad: 'Velocidad de Procesamiento'
    };

    let y = 180;
    Object.entries(result.categoryBreakdown).forEach(([key, value]) => {
        const label = categories[key] || key;
        const score = value as number;

        // Category name
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        doc.text(label, 40, y);

        // Score bar background
        doc.setFillColor(229, 231, 235);
        doc.rect(40, y + 3, 130, 6, 'F');

        // Score bar fill
        const barWidth = (score / 100) * 130;
        doc.setFillColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
        doc.rect(40, y + 3, barWidth, 6, 'F');

        // Score text
        doc.setFontSize(10);
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text(`${score}`, 175, y + 7, { align: 'right' });

        y += 18;
    });

    // Footer section
    y = 260;
    doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    doc.rect(0, y, 210, 37, 'F');

    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('Este certificado valida los resultados obtenidos en la evaluación IQCheck.', 105, y + 12, { align: 'center' });
    doc.text('Para más información, visita: iq-check-umdy.vercel.app', 105, y + 20, { align: 'center' });

    // Watermark
    doc.setFontSize(60);
    doc.setTextColor(0, 0, 0, 0.03);
    doc.setFont('helvetica', 'bold');
    doc.text('IQCheck', 105, 150, { align: 'center', angle: 45 });

    doc.save(`IQCheck_Certificado_${result.iq}.pdf`);
}
