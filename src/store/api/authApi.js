const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const signupApi = async ({ name, email, mobile, terms_agreed }) => {
  const response = await fetch(`${API_URL}/api/customer/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, mobile, terms_agreed }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data.data;
};

export const resendOtpApi = async ({ mobile }) => {
  const response = await fetch(`${API_URL}/api/customer/signup/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resend OTP");
  }

  return data.data;
};

export const verifyOtpApi = async ({ mobile, otp }) => {
  const response = await fetch(`${API_URL}/api/customer/signup/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  // Store token in localStorage
  if (data.data?.token) {
    localStorage.setItem("authToken", data.data.token);
  }

  return data.data;
};

export const loginApi = async ({ emailOrPhone, recaptchaToken }) => {
  const response = await fetch(`${API_URL}/api/customer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrPhone, recaptchaToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.data;
};

export const resendLoginOtpApi = async ({ emailOrPhone }) => {
  const response = await fetch(`${API_URL}/api/customer/login/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrPhone }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resend OTP");
  }

  return data.data;
};

export const verifyLoginOtpApi = async ({ emailOrPhone, otp }) => {
  const response = await fetch(`${API_URL}/api/customer/login/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrPhone, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  // Store token in localStorage
  if (data.data?.token) {
    localStorage.setItem("authToken", data.data.token);
  }

  return data.data;
};

export const googleSendOtpApi = async ({ googleId, mobile, email, name }) => {
  const response = await fetch(`${API_URL}/api/customer/google/register-mobile/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ googleId, mobile, email, name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }

  return data.data;
};

export const googleResendOtpApi = async ({ googleId, mobile }) => {
  const response = await fetch(`${API_URL}/api/customer/google/register-mobile/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ googleId, mobile }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resend OTP");
  }

  return data.data;
};

export const googleVerifyOtpApi = async ({ googleId, mobile, otp }) => {
  const response = await fetch(`${API_URL}/api/customer/google/register-mobile/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ googleId, mobile, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  // Store token in localStorage
  if (data.data?.token) {
    localStorage.setItem("authToken", data.data.token);
  }

  return data.data;
};

export const logoutApi = async (token) => {
  const response = await fetch(`${API_URL}/api/customer/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  localStorage.removeItem("authToken");
  return data.data;
};
