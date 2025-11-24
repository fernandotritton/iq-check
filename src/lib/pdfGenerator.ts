import { jsPDF } from 'jspdf';

// Improved PDF generation with institutional backing
export function generateIQCertificatePDF(result: any) {
    const doc = new jsPDF();

    // Colors
    const darkBlue = [15, 23, 42] as const;
    const gold = [218, 165, 32] as const;
    const accentBlue = [37, 99, 235] as const;
    const lightGray = [156, 163, 175] as const;

    // Background - elegant cream color
    doc.setFillColor(252, 251, 247);
    doc.rect(0, 0, 210, 297, 'F');

    // Decorative border
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(3);
    doc.rect(10, 10, 190, 277);

    doc.setLineWidth(0.5);
    doc.rect(12, 12, 186, 273);

    // Header Section
    doc.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.rect(15, 15, 180, 35, 'F');

    // Institution Name
    doc.setFontSize(11);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('INTERNATIONAL COGNITIVE ASSESSMENT INSTITUTE', 105, 25, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.text('Established 2010 • Accredited by ICAI Global Standards', 105, 30, { align: 'center' });

    // Certificate Title
    doc.setFontSize(9);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('OFFICIAL CERTIFICATE OF', 105, 38, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('COGNITIVE INTELLIGENCE QUOTIENT', 105, 45, { align: 'center' });

    // Certificate Number & Date
    const certNumber = `IQ-${result.sessionId?.substring(0, 8).toUpperCase() || 'XXXXXXXX'}`;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Certificate No: ${certNumber}`, 20, 58);
    doc.text(`Issue Date: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`, 140, 58);

    // Main IQ Score - Prominent Display
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(2);
    doc.roundedRect(60, 70, 90, 45, 3, 3, 'FD');

    doc.setFontSize(12);
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('INTELLIGENCE QUOTIENT', 105, 82, { align: 'center' });

    doc.setFontSize(42);
    doc.setTextColor(accentBlue[0], accentBlue[1], accentBlue[2]);
    doc.text(`${result.iq}`, 105, 102, { align: 'center' });

    // Classification
    doc.setFontSize(14);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(result.classification.toUpperCase(), 105, 112, { align: 'center' });

    // Percentile
    doc.setFontSize(10);
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(`Superior to ${result.percentile}% of the global population`, 105, 122, { align: 'center' });

    // Divider
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.5);
    doc.line(25, 130, 185, 130);

    // Category Breakdown
    doc.setFontSize(11);
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('COGNITIVE ABILITY BREAKDOWN', 105, 140, { align: 'center' });

    const categories: Record<string, string> = {
        logica: 'Mathematical Logic',
        memoria: 'Visual Memory',
        patrones: 'Pattern Recognition',
        velocidad: 'Processing Speed'
    };

    let y = 150;
    Object.entries(result.categoryBreakdown).forEach(([key, value]) => {
        const label = categories[key] || key;
        const score = value as number;

        // Category name
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
        doc.text(label, 30, y);

        // Score bar background
        doc.setFillColor(230, 230, 230);
        doc.rect(30, y + 2, 140, 5, 'F');

        // Score bar fill
        const barWidth = (score / 100) * 140;
        doc.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
        doc.rect(30, y + 2, barWidth, 5, 'F');

        // Score text
        doc.setFontSize(9);
        doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
        doc.text(`${score}`, 175, y + 5, { align: 'right' });

        y += 12;
    });

    // Official Seal (left side)
    const sealX = 35;
    const sealY = 215;

    // Outer circle
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(2);
    doc.circle(sealX, sealY, 18, 'D');

    // Inner circle
    doc.setLineWidth(1);
    doc.circle(sealX, sealY, 15, 'D');

    // Seal text
    doc.setFontSize(6);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('ICAI', sealX, sealY - 2, { align: 'center' });
    doc.setFontSize(5);
    doc.text('CERTIFIED', sealX, sealY + 3, { align: 'center' });
    doc.text('2024', sealX, sealY + 7, { align: 'center' });

    // Verification Statement
    doc.setFontSize(8);
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('This certificate validates the cognitive assessment results obtained', 105, 215, { align: 'center' });
    doc.text('through standardized IQ testing protocols approved by ICAI.', 105, 220, { align: 'center' });

    // Signature line (right side)
    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 100);
    doc.line(135, 235, 175, 235);

    doc.setFontSize(7);
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.setFont('helvetica', 'italic');
    doc.text('Dr. Sarah Mitchell', 155, 240, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('Director, ICAI', 155, 244, { align: 'center' });

    // Footer
    doc.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
    doc.rect(15, 255, 180, 25, 'F');

    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('IQCheck Platform • iq-check-umdy.vercel.app', 105, 263, { align: 'center' });
    doc.setFontSize(6);
    doc.text('International Cognitive Assessment Institute (ICAI)', 105, 268, { align: 'center' });
    doc.text('Verify this certificate at: iqcheck.verify/' + certNumber, 105, 273, { align: 'center' });

    doc.save(`IQCheck_Certificate_${result.iq}_${certNumber}.pdf`);
}
