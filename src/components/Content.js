export function Content() {
  return (
    <main id="main">
      <div className="content-ctr">
        {/* <div id="content-line-nums" className="content-line-nums"></div> */}
        <textarea
          id="content"
          className="content"
          placeholder="Start typing here..."
        ></textarea>
      </div>
    </main>
  );
}
