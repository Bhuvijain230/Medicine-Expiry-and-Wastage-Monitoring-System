import React from 'react';
import './Reports.css';

const reports = [
  {
    title: 'List of Expired Medicines',
    chart: '📊',
    action: 'View',
  },
  {
    title: 'List of Medicines Nearing Expiry',
    chart: '📈',
    action: 'View',
  },
  {
    title: 'Wastage Reports',
    chart: '🌊',
    action: 'Download',
  },
  {
    title: 'Donation Success Rates',
    chart: '🟦',
    action: 'Download',
  },
];

const Reports = () => {
  const handleGenerateExpired = () => {
    alert('Generating expired medicines report...');
  };

  const handleGenerateWastage = () => {
    alert('Generating wastage report...');
  };

  const handleReportAction = (reportTitle, action) => {
    alert(`${action} for ${reportTitle}`);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Reports</h1>
        <div className="generate-buttons">
          <button className="generate-btn" onClick={handleGenerateExpired}>
            Generate Expiry Report
          </button>
          <button className="generate-btn" onClick={handleGenerateWastage}>
            Generate Wastage Report
          </button>
        </div>
      </div>

      <div className="report-list">
        {reports.map((report, index) => (
          <div className="report-card" key={index}>
            <div className="report-icon">{report.chart}</div>
            <div className="report-details">
              <h3>{report.title}</h3>
              <p className="placeholder-line"></p>
              <p className="placeholder-line short"></p>
            </div>
            <div
              className="report-action"
              onClick={() => handleReportAction(report.title, report.action)}
            >
              {report.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
