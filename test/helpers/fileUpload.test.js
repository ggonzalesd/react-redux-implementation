import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dtk4jojr5",
  api_key: "317568722195124",
  api_secret: "ViE1UpOia2ADTWuc_1gB4PzZij4",
  secure: true,
});

describe("Prueba en fileUpload", () => {
  test("debe de subir le archivo correctamente cloudinary", async () => {
    const imageUrl =
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].split(".")[0];

    await cloudinary.api.delete_resources(["journal/" + imageId], {
      resource_type: "image",
    });
  });

  test("debe de retornar null", async () => {
    const file = new File([], "tofo.jpg");

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
