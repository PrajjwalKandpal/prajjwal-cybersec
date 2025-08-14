-- Create contacts table for portfolio contact form
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    phone VARCHAR(50),
    service_type VARCHAR(100),
    budget_range VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new',
    notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Insert sample data for testing
INSERT INTO contacts (name, email, company, subject, message, service_type, budget_range) VALUES
('John Smith', 'john.smith@techcorp.com', 'TechCorp Inc', 'Security Assessment Request', 'We need a comprehensive security assessment for our web applications and network infrastructure.', 'Penetration Testing', '$10,000 - $25,000'),
('Sarah Johnson', 'sarah@startup.io', 'StartupIO', 'Incident Response Consultation', 'We experienced a potential security breach and need immediate consultation on incident response procedures.', 'Incident Response', '$5,000 - $10,000'),
('Mike Chen', 'mike.chen@finance.com', 'Finance Solutions', 'Compliance Audit', 'Looking for help with SOC 2 compliance and security audit preparation.', 'Risk Assessment', '$15,000 - $30,000');
