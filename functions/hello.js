export async function onRequest() {
  return new Response(JSON.stringify({ id: 'hello' }));
}
