export function getLists(value) {
  return fetch('/api/getListsAsycn?value=' + value)
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}