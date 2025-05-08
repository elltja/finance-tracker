type Provider = "github" | "google";

export default function OAuth() {
  function handleOAuthLogin(provider: Provider) {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/auth/${provider}`;
  }
  return (
    <div className="h-fit flex flex-col gap-3">
      <button className="p-2 rounded-md cursor-pointer border border-gray-300 w-full flex justify-center gap-3">
        <img src="/google.png" alt="Google's logo" className="w-5 h-5" />
        Continue with Google
      </button>
      <button
        className="p-2 rounded-md cursor-pointer border border-gray-300 w-full flex justify-center gap-3"
        onClick={() => handleOAuthLogin("github")}
      >
        <img src="/github.png" alt="Github's logo" className="w-5 h-5" />
        Continue with Github
      </button>
    </div>
  );
}
