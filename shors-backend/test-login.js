async function test() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@shors.in", password: "Admin@123" })
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Data:", data);
  } catch (e) {
    console.error(e);
  }
}
test();
