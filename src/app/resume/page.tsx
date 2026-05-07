import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Resume — Jenish Patel",
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back home
            </Link>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>

          {/* PDF embed */}
          <div className="w-full border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <object
              data="/resume.pdf"
              type="application/pdf"
              className="w-full"
              style={{ height: "85vh" }}
            >
              <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-4">
                <FileText className="w-12 h-12 text-slate-300" />
                <p className="text-lg font-medium text-slate-700">Resume PDF not found</p>
                <p className="text-sm text-center max-w-xs">
                  Drop <code className="bg-slate-100 px-1 rounded">resume.pdf</code> into the{" "}
                  <code className="bg-slate-100 px-1 rounded">public/</code> folder to display it
                  here.
                </p>
              </div>
            </object>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
