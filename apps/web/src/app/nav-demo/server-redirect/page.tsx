// Server-side navigation: redirect() runs on the server before anything renders
import { redirect } from "next/navigation";

export default function ServerRedirectPage() {
  redirect("/nav-demo/page-a");
}
