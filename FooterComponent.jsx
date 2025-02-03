import React from 'react'
const FooterComponent = () => {
    return (
        <div className="footer-container">
            <footer className='footer'>
                {/* Left Section: Logo */}
                <div className="footer-section left">
                    <img 
                        src="vcubefrontend/src/image/image.png"
                        alt="Logo" 
                        className="footer-logo" 
                    />
                </div>

                <div className="footer-section middle">
                    <select className="course-dropdown" aria-label="Select Course">
                        <option value="course1">Java Full Stack</option>
                        <option value="course2">Python Full Stack</option>
                        <option value="course3">Testing Tools</option>
                        <option value="course4">Devopes</option>
                        <option value="course5">Cyber Security</option>
                        <option value="course6">AWS Devepos</option>
                        <option value="course7">Digital Markerting</option>
                        <option value="course8">Data Science</option>
                    </select>
                </div>

                {/* Right Section: Follow Us */}
                <div className="footer-section right">
                    <span className="follow-us">Follow Us:</span>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <img 
                            src="/path/to/instagram-icon.png" 
                            alt="Instagram" 
                            className="social-icon" 
                        />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <img 
                            src="/path/to/youtube-icon.png" 
                            alt="YouTube" 
                            className="social-icon" 
                        />
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <img 
                            src="/path/to/whatsapp-icon.png" 
                            alt="WhatsApp" 
                            className="social-icon" 
                        />
                    </a>
                    <a href="/path/to/pamphlet.pdf" target="_blank" rel="noopener noreferrer" className="social-link">
                        <img 
                            src="/path/to/pamphlet-icon.png" 
                            alt="Pamphlet" 
                            className="social-icon" 
                        />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default FooterComponent;