import axios from "axios";
const baseUrl = "http://localhost:5000/api/v1";
const guestBaseUrl = "http://192.168.100.195:9000";

export async function singUp(input) {
  const res = await axios
    .post(`${baseUrl}/auth/register`, input)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
}

export async function refreshToken() {
  const resToken = await fetch(`${baseUrl}/auth/refresh`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let data = await resToken.json();

  const res = await fetch(`${baseUrl}/auth/protected`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  let resAuth = await res.json();
  return resAuth;
}

export async function sendLogin(input) {
  const isAuth = await axios
    .post(`${baseUrl}/auth/login`, input, { withCredentials: true })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return isAuth;
}

export async function logout() {
  const res = await axios
    .get(`${baseUrl}/auth/logout`, { withCredentials: true })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return res;
}

export async function CreateEventDB(input) {
  const res = await axios
    .post(`${baseUrl}/events`, input, { withCredentials: true })
    .then((response) => {
      const { newEvent } = response.data
      return newEvent;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function getAllEventsDB() {
  const res = await axios
    .get(`${baseUrl}/events`, { withCredentials: true })
    .then((response) => {
      const { Events } = response.data
      return Events;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function getEventById(id) {
  const res = await axios
    .get(`${baseUrl}/events/${id}`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function saveImagenByEventId(file) {
  const res = await axios
    .post(`${baseUrl}/api/uploadphoto`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function getImageDB(fileName) {
  let file = "";
  let url = "";
  const res = await axios
    .get(`${baseUrl}/api/photo/${fileName}`, { responseType: "blob" })
    .then((res) => {
      url = res.config.url;
      file = res.data;
      return { url, file };
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return res;
}

export async function guestGetImageDB(fileName) {
  const res = await axios
    .get(`${guestBaseUrl}/api/photo/${fileName}`, { responseType: "blob" })
    .then((res) => {
      return res.config.url;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return res;
}

export async function deleteEvent(id, eventSelected) {
  const slidersDeletePromises = []
  try{
    eventSelected.eventSlides.map(async (slide) => {
      slidersDeletePromises.push(await deleteSlider(slide._id))
    })
  }catch(error){
    console.log(error)
  }
  Promise.all(slidersDeletePromises).then(async()=>{
      const res = await axios
      .delete(`${baseUrl}/events/${id}`, { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
      return res;
    }
  )
}

export async function updateEventDB(id, input) {
  const res = await axios
    .patch(`${baseUrl}/events/${id}`, input, { withCredentials: true })
    .then((response) => {
      const { event } = response.data
      return event;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function updateEventImage(id, input) {
  const res = await axios
    .patch(`${baseUrl}/events/imageSrc/${id}`, input, { withCredentials: true })
    .then((response) => {
      const { event } = response.data
      return event;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function updateSlidesImage(id, input) {
  const res = await axios
    .patch(`${baseUrl}/events/slideimages/${id}`, input, { withCredentials: true })
    .then((response) => {
      const { event } = response.data
      return event;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}


export async function updateEventSlide(id, input) {
  try {
    const { newSlider } = await createSlide(input)
    if (newSlider) {
      const res = await axios
        .patch(`${baseUrl}/events/eventslide/${id}`,  {slide: newSlider} , { withCredentials: true })
        .then((response) => {
          const { event } = response.data
          return event;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
        console.log(res)
      return res;
    } else {
      console.log("error")
    }
  } catch (error) {
    console.error(error)
  }

}


export async function createSlide(input) {
  const res = await axios
    .post(`${baseUrl}/slides`, input, { withCredentials: true })
    .then((response) => {
      const res = response.data
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}

export async function getSlideByIdDB(id) {
  const res = await axios
    .get(`${baseUrl}/slides/${id}`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return res
}

export async function deleteSlider(id) {
  const res = await axios
    .delete(`${baseUrl}/slides/${id}`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return res;
}