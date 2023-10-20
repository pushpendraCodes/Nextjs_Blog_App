export function fetchPosts(queryString) {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts?${queryString}`);
      let data = await res.json();

      resolve(data);
    } catch (error) {
      console.log(error, "error");
    }
  });
}
export function fetchPost(id) {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        cache: "no-store",
      });
      let data = await res.json();

      resolve(data);
    } catch (error) {
      console.log(error, "error");
    }
  });
}
export function fetchPopularPost() {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch("http://localhost:3000/api/popularPost" );

      let data = await res.json();
      console.log(data,"res")
      resolve(data);
    } catch (error) {
      console.log(error, "error");
    }
  });
}
export function postComment(updatedObject) {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment`, {
        method: "PATCH",
        body: JSON.stringify(updatedObject),
        headers: { "content-type": "application/json" },
      });
      let data = await res.json();

      resolve(data);
    } catch (error) {
      console.log(error, "error");
    }
  });
}
