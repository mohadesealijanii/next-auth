import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Registeration Form</h1>
      <button>
        <Link href={"/Signup"}>Signup</Link>
      </button>
    </div>
  );
}
