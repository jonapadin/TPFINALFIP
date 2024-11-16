const url = "../bd/veterinarias.json";

export async function obtenerVeterinarias() {

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }

}


