# Medicine Expiry \& Wastage Monitoring System

## Overview

**Medicine Expiry \& Wastage Monitoring System** is a web-based application designed to help hospitals, pharmacies, and households efficiently track medicine inventories, monitor expiry dates, and minimize wastage. The system automates expiry alerts and facilitates ethical redistribution of near-expiry medicines to NGOs or charitable clinics, reducing financial loss, environmental impact, and public health risks.

## Problem Statement

Managing medicine inventory is a challenge at all scales—from large hospitals to individual households—due to:

- **Financial Loss:** Unused, expired medicines represent direct monetary loss.
- **Environmental Impact:** Improper disposal contaminates soil and water.
- **Public Health Risk:** Expired medicines can be ineffective or harmful.
- **Resource Misallocation:** Usable medicines nearing expiry could benefit others.
- **Operational Inefficiency:** Manual tracking is labor-intensive and error-prone.


## Solution

This system automates expiry tracking and notification, enabling proactive management and ethical redistribution:

- **Centralized Inventory:** Securely stores medicine details (name, batch, expiry, quantity, storage location).
- **Automated Alerts:** Sends notifications via email (and optionally SMS or in-app) at set intervals (e.g., 30, 15, 5 days before expiry).
- **Donation Suggestions:** Connects users with NGOs/clinics for redistribution of near-expiry medicines.
- **Role-Based Access:** Assigns permissions based on user roles (Admin, Manager, Data Entry, Viewer).
- **Reporting:** Visualizes expiry trends, wastage, and donation outcomes.


## Features

- **Inventory Management:** Add, update, and view medicines with expiry tracking.
- **Automated Expiry Alerts:** Scheduled checks and notifications for medicines nearing expiry.
- **Donation Workflow:** Mark medicines for donation and view suggested NGOs/clinics.
- **Role-Based Access Control:** Admin, Manager/Pharmacist, Data Entry, and Viewer roles.
- **Reporting \& Analytics:** Generate and view wastage, donation, and inventory reports.
- **Extensible Notification System:** Email, in-app, and optional SMS alerts (notification branch).
- **Data Import:** Scripts to insert sample data for hospitals and wellness centers.


## System Flow

1. **User Registration \& Role Assignment:** Admin creates user accounts and assigns roles.
2. **Inventory Management:** Users add and update medicine records, including expiry dates.
3. **Automated Monitoring:** System checks for upcoming expiries and generates alerts.
4. **Notification Delivery:** Alerts are sent to users for timely action.
5. **Redistribution:** Users can mark medicines for donation; system suggests NGOs/clinics.
6. **Reporting:** Admins/managers access dashboards for wastage and donation analytics.

## Technologies Used

- **Backend:** Python (Flask)
- **Database:** SQLite (for prototyping; can be upgraded to PostgreSQL/MySQL)
- **Frontend:** Jinja templates, Bootstrap
- **Notification:** Python `smtplib`, Flask-Mail, or integration with external APIs (SendGrid, Twilio, etc.)
- **Scheduler:** Cron jobs or APScheduler for automated expiry checks


## Project Structure

```
Medicine-Expiry-and-Wastage-Monitoring-System/
│
├── app/                       # Flask application code (models, routes, templates)
├── data/                      # Sample data or data scripts
├── insert_data.py             # Script to populate initial medicine data
├── insert_hospitals_data.py   # Script to populate hospital data
├── insert_wellness_data.py    # Script to populate wellness center data
├── requirements.txt           # Python dependencies
└── run.py                     # Application entry point
```


## Branches

- **main:** Core inventory management and base features.
- **notification:** Adds and tests the automated notification system for expiry alerts.


## Setup \& Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Bhuvijain230/Medicine-Expiry-and-Wastage-Monitoring-System.git
cd Medicine-Expiry-and-Wastage-Monitoring-System
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Configure Environment:**
    - Edit configuration files or `.env` for database and email/SMS credentials.
4. **Initialize the database:**

```bash
flask db upgrade
python insert_data.py
python insert_hospitals_data.py
python insert_wellness_data.py
```

5. **Run the application:**

```bash
python run.py
```

6. **Access the app:**
    - Default: http://localhost:5000

## Usage

- **Admin:** Configure alert thresholds, manage users, view reports, maintain NGO/clinic list.
- **Pharmacists/Managers:** Add/edit medicines, receive expiry alerts, mark items for donation.
- **Data Entry:** Input new stock, update quantities.
- **Viewers:** Read-only access to inventory and alerts.


## Contribution

Contributions are welcome! Please fork the repo and submit a pull request. For major changes, open an issue to discuss your ideas.

## License

This project is intended for educational and demonstration purposes.

## Acknowledgments

Inspired by the need for efficient medicine management and waste reduction in healthcare settings.

**For detailed technical documentation, see in-code comments and the `/docs` directory (if available).**
