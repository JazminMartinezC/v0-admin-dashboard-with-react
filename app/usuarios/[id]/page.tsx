import { UserDetailsContent } from "@/components/user-details-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params

  return <UserDetailsContent userId={id} />
}
