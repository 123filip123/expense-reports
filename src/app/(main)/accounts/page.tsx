import { AddAccountForm } from "@/components/ui/add-account-form/add-account-form";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";

export default async function Page() {
  return (
    <PageWrapper>
      <TypographyH2 className="mb-6">Accounts</TypographyH2>
      <AddAccountForm />
    </PageWrapper>
  );
}
