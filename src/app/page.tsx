import ArticleList from "@/components/ArticleList";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const paramsObject = searchParams
    ? Object.fromEntries(Object.entries(searchParams))
    : {};

  return (
    <main>
      <div>
        <ArticleList searchParams={paramsObject} />
      </div>
    </main>
  );
}
