export const userDetails = (data) => {
  const { accessToken, email, name, userTypes, userId, userStatus } = data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  localStorage.setItem("userId", userId);
  localStorage.setItem("userTypes", userTypes);
  localStorage.setItem("userStatus", userStatus);
};
