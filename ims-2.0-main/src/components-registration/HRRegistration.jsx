import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HRRegistration.css";
import RegistrationVerificationPopup from "../reusable-components/RegistrationVerificationPopup";
import HRIllustration from "../assets/registration/HRRegistrationIllustration.png";
import RegisterUsers from "../assets/registration/RegisterUsers.png";
import CompanyIcon from "../assets/registration/Company-icon.png";
import eye from "../assets/registration/eye.png";
import eyeclose from "../assets/registration/eyeclose.png";
import formdropdown from "../assets/registration/formdropdown.png";
import { Header } from "../reusable-components/Header";

export const HRRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [verificationValue, setVerificationValue] = useState("");

  const [verifiedFields, setVerifiedFields] = useState({
    email: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVerify = (field) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (field === "email") {
      if (!formData.email.trim()) {
        setErrors((prev) => ({
          ...prev,
          email: "Work Email is required",
        }));
        return;
      }

      if (!emailRegex.test(formData.email.trim())) {
        setErrors((prev) => ({
          ...prev,
          email: "Enter a valid email address",
        }));
        return;
      }
    }

    if (field === "phone") {
      if (!formData.phone.trim()) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone Number is required",
        }));
        return;
      }

      if (!phoneRegex.test(formData.phone.trim())) {
        setErrors((prev) => ({
          ...prev,
          phone: "Enter a valid 10-digit mobile number",
        }));
        return;
      }
    }

    setVerificationType(field);

    setVerificationValue(
      field === "email" ? formData.email.trim() : formData.phone.trim(),
    );

    setShowVerificationPopup(true);
  };

  const handleVerifySuccess = () => {
    setVerifiedFields((prev) => ({
      ...prev,
      [verificationType]: true,
    }));

    setShowVerificationPopup(false);
  };

  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Work Email is required";
    } else if (
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company Name is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (!formData.password.trim()) {
      newErrors.confirmPassword = "Please enter password first";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptedTerms) {
      newErrors.terms = "Please accept the Terms of Service and Privacy Policy";
    }

    if (formData.email.trim() && !newErrors.email && !verifiedFields.email) {
      newErrors.email = "Please verify your email address";
    }

    if (formData.phone.trim() && !newErrors.phone && !verifiedFields.phone) {
      newErrors.phone = "Please verify your phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Registration data:", formData);
    navigate("/login");
  };

  return (
    <div className="ims-hr-registration-page">
      <div className="ims-hr-registration-left-section">
        <Header />

        <div className="ims-hr-registration-heading-section">
          <h4 className="ims-hr-registration-heading">
            Empower your team with
            <br />
            top-tier talent.
          </h4>

          <p className="ims-hr-registration-heading-text">
            Streamline your recruitment process, manage internships with
            ease,and connect with the next generation of industry leaders.
          </p>
        </div>

        <div className="ims-hr-registration-illustration">
          <img
            src={HRIllustration}
            className="ims-hr-registration-illustration-image"
            alt="internshipImage"
          />
        </div>

        <div className="ims-hr-registration-talent-card">
          <div className="ims-hr-registration-talent-header">
            <img
              src={RegisterUsers}
              className="ims-hr-registration-talent-icon"
              alt="Users-icon"
            />

            <div className="ims-hr-registration-talent-text">
              <h3 className="ims-hr-registration-talent-heading">
                Unified Talent Dashboard
              </h3>
              <p className="ims-hr-registration-talent-description">
                Monitor all applications in real-time.
              </p>
            </div>
          </div>

          <div className="ims-hr-registration-progress-bar">
            <div className="ims-hr-registration-progress-fill"></div>
          </div>

          <div className="ims-hr-registration-talent-footer">
            <span>75% Efficiency Boost</span>
            <span>120+ Placements</span>
          </div>
        </div>

        <div className="ims-hr-registration-stats">
          <div className="ims-hr-registration-stat-item">
            <h3 className="ims-hr-registration-stat-value">500+</h3>
            <p className="ims-hr-registration-stat-label">COMPANIES</p>
          </div>

          <div className="ims-hr-registration-stat-item">
            <h3 className="ims-hr-registration-stat-value">10K+</h3>
            <p className="ims-hr-registration-stat-label">STUDENTS</p>
          </div>
        </div>
      </div>

      <div className="ims-hr-registration-right-section">
        <div className="ims-hr-registration-form-container">
          <div className="ims-hr-backbtn-align">
            <div>
              <h2 className="ims-hr-registration-form-title">
                Create your account
              </h2>
              <p className="ims-hr-registration-form-description">
                Join our ecosystem of professional employers.
              </p>
            </div>
            <button
              className="ims-hr-registration-backbtn"
              onClick={() => navigate("/welcome")}
            >
              {" "}
              Back to Selection
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="ims-hr-registration-form-group">
              <label className="ims-hr-registration-form-label">
                REGISTERING AS{" "}
                <span className="ims-hr-registration-required">*</span>
              </label>

              <div className="ims-hr-registration-select-wrapper">
                <select
                  id="ims-company-registration-registering-as"
                  name="registeringAs"
                  className="ims-company-registration-form-drop-down"
                  defaultValue="Company"
                  disabled
                >
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>

            <div className="ims-hr-registration-form-row">
              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Full Name{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`ims-hr-registration-form-input ${errors.fullName ? "ims-hr-registration-error-border" : ""}`}
                />
                {errors.fullName && (
                  <p className="ims-hr-registration-error">
                    {errors.fullName || ""}
                  </p>
                )}
              </div>

              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Work Email Address{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-verify-input">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@company.com"
                    className={`ims-hr-registration-form-input ${errors.email ? "ims-hr-registration-error-border" : ""}`}
                  />
                  {formData.email.trim() && (
                    <button
                      type="button"
                      className={`ims-hr-registration-verify-button ${
                        verifiedFields.email
                          ? "ims-hr-registration-verified"
                          : ""
                      }`}
                      onClick={() => handleVerify("email")}
                    >
                      {verifiedFields.email ? "Verified" : "Verify"}
                    </button>
                  )}
                </div>

                {errors.email && (
                  <p className="ims-hr-registration-error">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="ims-hr-registration-form-row">
              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Phone Number{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-phone-input">
                  <span className="ims-hr-registration-country-code">+91</span>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    minLength={10}
                    placeholder="Enter your number"
                    className={`ims-hr-registration-form-input ${errors.phone ? "ims-hr-registration-error-border" : ""}`}
                  />
                  {formData.phone.trim() && (
                    <button
                      type="button"
                      className={`ims-hr-registration-verify-button ${
                        verifiedFields.phone
                          ? "ims-hr-registration-verified"
                          : ""
                      }`}
                      onClick={() => handleVerify("phone")}
                    >
                      {verifiedFields.phone ? "Verified" : "Verify"}
                    </button>
                  )}
                </div>

                {errors.phone && (
                  <p className="ims-hr-registration-error">{errors.phone}</p>
                )}
              </div>

              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Department{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-select-wrapper">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`ims-hr-registration-form-select ${errors.department ? "ims-hr-registration-error-border" : ""}`}
                  >
                    <option value=""> Select department </option>
                    <option value="Intern">Intern</option>
                    <option value="Mentor">Mentor</option>
                    <option value="HR">HR</option>
                    <option value="Company">Company</option>
                  </select>

                  <img
                    src={formdropdown}
                    alt="DropdownArrow"
                    className="ims-hr-registration-dropdown-arrow"
                  />
                </div>
                {errors.department && (
                  <p className="ims-hr-registration-error">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>

            <div className="ims-hr-registration-form-group">
              <label className="ims-hr-registration-form-label">
                Company Name{" "}
                <span className="ims-hr-registration-required">*</span>
              </label>
              <div className="ims-hr-registration-company-input">
                <img
                  src={CompanyIcon}
                  className="ims-hr-registration-company-icon"
                  alt="Company-icon"
                />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="InternHub Inc."
                  className={`ims-hr-registration-form-input ${errors.company ? "ims-hr-registration-error-border" : ""}`}
                />
              </div>
              {errors.company && (
                <p className="ims-hr-registration-error">{errors.company}</p>
              )}
            </div>

            <div className="ims-hr-registration-form-row">
              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Password{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`ims-hr-registration-form-input ${errors.password ? "ims-hr-registration-error-border" : ""}`}
                  />

                  <img
                    src={showPassword ? eye : eyeclose}
                    className="ims-hr-registration-password-icon"
                    alt="Eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                {errors.password && (
                  <p className="ims-hr-registration-error">{errors.password}</p>
                )}
              </div>

              <div className="ims-hr-registration-form-group">
                <label className="ims-hr-registration-form-label">
                  Confirm Password{" "}
                  <span className="ims-hr-registration-required">*</span>
                </label>

                <div className="ims-hr-registration-password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`ims-hr-registration-form-input ${errors.confirmPassword ? "ims-hr-registration-error-border" : ""}`}
                  />

                  <img
                    src={showConfirmPassword ? eye : eyeclose}
                    className="ims-hr-registration-password-icon"
                    alt="Eye-icon"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="ims-hr-registration-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="ims-hr-registration-terms">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="ims-hr-registration-terms-checkbox"
              />

              <p className="ims-hr-registration-terms-text">
                I agree to the{" "}
                <span className="ims-hr-registration-terms-link">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="ims-hr-registration-terms-link">
                  Privacy Policy
                </span>
              </p>
            </div>
            {errors.terms && (
              <p className="ims-hr-registration-error">{errors.terms}</p>
            )}

            <button type="submit" className="ims-hr-registration-create-button">
              Create Account
            </button>

            <div className="ims-hr-registration-divider">
              <hr className="ims-hr-registration-divider-line" />

              <p className="ims-hr-registration-divider-text">OR</p>

              <hr className="ims-hr-registration-divider-line" />
            </div>

            <div className="ims-hr-registration-signin">
              <p className="ims-hr-registration-signin-text">
                Already have an account?{" "}
                <Link
                  to="/components-registration/admin-registration"
                  className="ims-hr-registration-signin-link"
                >
                  {" "}
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {showVerificationPopup && (
        <RegistrationVerificationPopup
          type={verificationType}
          value={verificationValue}
          onClose={() => setShowVerificationPopup(false)}
          onVerified={handleVerifySuccess}
        />
      )}
    </div>
  );
};
