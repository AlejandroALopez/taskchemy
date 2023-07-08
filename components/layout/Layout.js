import Navigation from "./Navigation";

function Layout(props) {
  return (
    <div className={"flex flex-col md:flex-row"}>
      <Navigation />
      <main className={"w-full bg-background"}>{props.children}</main>
    </div>
  );
}

export default Layout;
