// app/api/files/presigned-url/route.ts
import { NextRequest } from "next/server";
import { proxyJSON } from "@/app/api/_lib/proxy";


// 2) 실제 POST 요청 프록시
export async function POST(req: NextRequest) {
  
  return proxyJSON(req, "/api/files/presigned-url", {
    method: "POST",
    forwardAuth: true, 
  });
}
