import seoPages from "@/seoPagesConfig";
import DynamicSeoPage from "@/components/DynamicSeoPage";
import HomePage from "../page";

export async function generateMetadata({ params }) {
  //console.log(`Inside generateMetadata`);
  const { slug } = await params;
  //console.log(`slug = ${slug}`);
  const page = seoPages.find((p) => p.slug === slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  //console.log(`Page content ` + JSON.stringify(page));
  return (
    <HomePage>
      <div className="container">
        <div className="glass" style={{ padding: "30px" }}>
          <h1>{page.h1}</h1>
          <p>{page.description}</p>
          <h2>Use Case</h2>
          <p>{page.useCase}</p>
          <DynamicSeoPage slug={slug} />
          <h2>FAQ</h2>
          {page.faq.map((f, i) => (
            <div key={i}>
              <p>
                <b>{f[0]}</b>
              </p>
              <p>{f[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </HomePage>
  );
}
