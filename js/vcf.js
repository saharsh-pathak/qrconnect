function downloadVCF(memberId) {
  const m = TEAM_MEMBERS[memberId];
  if (!m) return;

  const names = m.name.split(" ");
  const lastName = names.slice(1).join(" ") || "";
  const firstName = names[0] || "";

  const vcfContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${m.name}`,
    `N:${lastName};${firstName};;;`,
    `ORG:Jaypee Institute of Information Technology (JIIT)`,
    `TITLE:${m.dept || m.role}`,
    `EMAIL;TYPE=INTERNET,WORK:${m.email}`,
    m.linkedin ? `URL;TYPE=LinkedIn:${m.linkedin}` : "",
    m.github ? `URL;TYPE=GitHub:${m.github}` : "",
    `NOTE:Connected at Indian Mobile Congress 2026`,
    "END:VCARD"
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${memberId}-contact.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
