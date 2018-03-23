var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
    console.log('data returned:', xhr.response);
}
xhr.send(JSON.stringify({query: `
{
	courses {
    id
	  score
	  course
	}
  users {
    id
    name
  }
}
`}));



var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "/article");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
    console.log('data returned:', xhr.response);
}
xhr.send(JSON.stringify({
    query: `
query getFewPosts($index: Int!,
  $index1: Int!,
  $index2: Int!) {
  first:posts(index:$index){
    ...post
  },
  second:posts(index:$index1){
    ...post,
    category
  },
  third:posts(index:$index2){
    ...post,
    layout
  }
}

fragment post on Post{
  title,
  category,
}
`,
    variables:{
        "index": 1,
        "index1": 2,
        "index2": 3
    }
}));