export async function POST(req: Request) {
  const { name } = await req.json();

  console.log(name);

  try {
  } catch (error) {}
}
