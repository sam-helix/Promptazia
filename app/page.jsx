import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Here you can discover, create and share AI powered prompt to other
      </p>
      <Feed />
    </section>
  );
};

export default Home;
