-- 🛠️ ตารางเมนู (Menus)
CREATE TABLE IF NOT EXISTS menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_key VARCHAR(255) NOT NULL UNIQUE,
    menu_label VARCHAR(255) NOT NULL,
    menu_path VARCHAR(255) NOT NULL
);

-- 🛠️ ตารางสิทธิ์เมนูสำหรับ Role ต่างๆ
CREATE TABLE IF NOT EXISTS role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('admin', 'director', 'staff') NOT NULL,
    menu_id INT NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
);

-- 🛠️ เพิ่มเมนูหลัก
INSERT INTO menus (menu_key, menu_label, menu_path) VALUES
('dashboard', '📊 Dashboard', '/'),
('meetings', '📅 ตารางประชุม', '/meetings'),
('acting-director', '📝 บันทึกรักษาการ', '/acting-director'),
('work-groups', '🏢 จัดการกลุ่มงาน', '/work-groups'),
('users', '👤 จัดการผู้ใช้', '/users');

-- 🛠️ กำหนดสิทธิ์ให้แต่ละ Role
INSERT INTO role_permissions (role, menu_id) VALUES
('admin', 1), ('admin', 2), ('admin', 3), ('admin', 4), ('admin', 5),
('director', 1), ('director', 2), ('director', 3),
('staff', 1), ('staff', 2);
