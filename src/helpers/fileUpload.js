export const fileUpload = async (file) => {
  //if (!file) throw new Error("No tenemos archivo");
  if (!file) return null;

  const cloudlUrl = "https://api.cloudinary.com/v1_1/dtk4jojr5/upload";

  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudlUrl, {
      method: "POST",
      body: formData,
    });

    console.log(resp);

    if (!resp.ok) throw Error("No se pudo subir imagen");

    const cloudResp = await resp.json();
    console.log({ cloudResp });

    return cloudResp.secure_url;
  } catch (error) {
    //console.error(error);
    return null;
  }
};
