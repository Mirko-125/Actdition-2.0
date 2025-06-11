import React, { useState } from "react";
import styles from "./CustomPrompts.module.css";
import global from "../../../components/functionalities/sliding-window/inner-content/global.module.css";

const ActorPrompt = ({ data }) => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    birthdate: "",
    bio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...formData };
    try {
      console.table(payload);
      console.log("Ispod mene je id korisnika!");
      console.log(data.id);
      console.log(payload);
      const response = await fetch(
        `http://localhost:5135/api/Users/CompleteActorRegistration/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const updatedActor = await response.json();
      console.table(updatedActor);
    } catch (error) {
      console.error("Failed to complete actor profile:", error);
      throw error;
    }
  };

  return (
    <>
      <div className={styles.parent}>
        <div className={global.fillarea}>
          <div className={global.form}>
            <label className={global.textlabel}>Height</label>
            <input
              className={global.finput}
              type="number"
              min="0"
              step="0.01"
              id="name"
              name="height"
              placeholder="Value [m], e.g. 1.91 m"
              onChange={handleChange}
            />
            <span className={global.iborder}></span>
          </div>

          <div className={global.form}>
            <label className={global.textlabel}>Weight</label>
            <input
              className={global.finput}
              type="number"
              min="0"
              step="0.1"
              id="name"
              name="weight"
              placeholder="Value [kg], e.g. 90.5 kg"
              onChange={handleChange}
            />
            <span className={global.iborder}></span>
          </div>

          <div className={global.form}>
            <label className={global.textlabel}>D.O.B.</label>
            <input
              className={global.finput}
              max="2008-1-1"
              type="date"
              id="name"
              name="birthdate"
              onChange={handleChange}
            />
            <span className={global.iborder}></span>
          </div>

          <div className={global.form}>
            <label className={global.textlabel} htmlFor="bio">
              Bio
            </label>
            <textarea
              className={global.finput}
              id="bio"
              name="bio"
              rows={6}
              placeholder="Write your bio here..."
              maxLength={2000}
              onChange={handleChange}
            />
            <span className={global.iborder}></span>
          </div>
        </div>
        <button className={global.submit} onClick={submit}>
          <span className="text">Done</span>
          <span>Hi</span>
        </button>
      </div>
    </>
  );
};

const CastingDirectorPrompt = ({ data }) => {
  const [formData, setFormData] = useState({
    code: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  return (
    <>
      <div className={global.fillarea}>
        <div className={global.form}>
          <label className={global.textlabel}>Production code</label>
          <input
            className={global.finput}
            id="name"
            maxLength={6}
            placeholder="Enter the production code"
            name="code"
            onChange={handleChange}
          />
          <span className={global.iborder}></span>
        </div>
      </div>
      <div className={styles.parent}>
        <button className={global.submit} onClick={console.log("dog")}>
          <span className="text">Done</span>
          <span>Get in</span>
        </button>
      </div>
    </>
  );
};

const ProducerPrompt = ({ data }) => {
  const [formData, setFormData] = useState({
    birthdate: "",
    bio: "",
    production: {
      name: "",
      id: null,
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleProductionNameChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      production: {
        ...prev.production,
        name: value,
      },
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const productionResponse = await fetch(
      `http://localhost:5135/api/Productions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.production.name }),
      }
    );

    if (!productionResponse.ok) {
      console.error("Bad!");
      return;
    }

    const createdProduction = await productionResponse.json();
    console.log(createdProduction.id);
    return; // You are here
    // 2. Create producer with productionId from created production
    const producerResponse = await fetch("/api/producers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        birthdate: formData.birthdate,
        biography: formData.bio,
        productionId: createdProduction.id,
      }),
    });

    if (!producerResponse.ok) {
      // handle error
      return;
    }

    const createdProducer = await producerResponse.json();
    // handle success, maybe clear form or redirect
  }

  return (
    <>
      <div className={styles.parent}>
        <div className={global.fillarea}>
          <div className={global.form}>
            <label className={global.textlabel}>D.O.B.</label>
            <input
              className={global.finput}
              max="2008-1-1"
              type="date"
              id="name"
              name="birthdate"
              onChange={handleChange}
            />
            <span className={global.iborder}></span>
          </div>
          <div className={global.form}>
            <label className={global.textlabel} htmlFor="bio">
              Bio
            </label>
            <textarea
              className={global.finput}
              id="bio"
              name="bio"
              rows={6}
              placeholder="Write your bio here..."
              maxLength={2000}
              onChange={handleChange}
            />
            <span className={global.iborder}></span>
          </div>
        </div>
        <div className={styles.subtitle}>Production creation:</div>
        <div className={global.fillarea}>
          <div className={global.form}>
            <label className={global.textlabel}>Production name</label>
            <input
              className={global.finput}
              type="text"
              id="productionname"
              name="production.name"
              value={formData.production.name}
              onChange={handleProductionNameChange}
            />
            <span className={global.iborder}></span>
          </div>
        </div>
        <button className={global.submit} onClick={handleSubmit}>
          <span className="text">Done</span>
          <span>Get in</span>
        </button>
      </div>
    </>
  );
};

const PositionComponents = {
  actor: ActorPrompt,
  castingdirector: CastingDirectorPrompt,
  producer: ProducerPrompt,
};

function CustomPrompts({ unfinished_user }) {
  const PositionComponent = PositionComponents[unfinished_user.position];

  if (!PositionComponent) {
    return (
      <div className={styles.error}>
        Neki eror koji ces blagovremeno napisati 😉
      </div>
    );
  }

  return <PositionComponent data={unfinished_user} />;
}

export default CustomPrompts;
