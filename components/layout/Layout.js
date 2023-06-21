import Navigation from './Navigation';

function Layout(props) {
  return (
    <div className={"flex flex-row"}>
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
