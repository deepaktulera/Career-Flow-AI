import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../services/resumeService";

const createEducation = () => ({
  degree: "",
  institution: "",
  startYear: "",
  endYear: "",
});

const createExperience = () => ({
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
});

const createProject = () => ({
  name: "",
  description: "",
  technologies: [],
  projectUrl: "",
  githubUrl: "",
});

const createCertification = () => ({
  name: "",
  organization: "",
  issueDate: "",
  credentialUrl: "",
});

const inputStyle =
  "w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textareaStyle = `${inputStyle} resize-none`;

const CreateResume = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    template: "classic",

    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      profilePic: "",
    },

    careerGoal: "",
    skills: [],
    education: [createEducation()],
    experience: [createExperience()],
    projects: [createProject()],
    certifications: [createCertification()],
  });

  const [skillInput, setSkillInput] = useState("");
  const [technologyInputs, setTechnologyInputs] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (event) => {
    setFormData({
      ...formData,
      title: event.target.value,
    });

    setError("");
  };

  const handleTemplateChange = (template) => {
    setFormData({
      ...formData,
      template: template,
    });
  };

  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    });

    setError("");
  };

  const handleCareerGoalChange = (event) => {
    setFormData({
      ...formData,
      careerGoal: event.target.value,
    });
  };

  const handleSkillInputChange = (event) => {
    setSkillInput(event.target.value);
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) {
      return;
    }

    if (formData.skills.includes(skill)) {
      return;
    }

    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
    });

    setSkillInput("");
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter(
      (_, skillIndex) => skillIndex !== index
    );

    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];

    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        createEducation(),
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter(
      (_, educationIndex) => educationIndex !== index
    );

    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];

    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        createExperience(),
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter(
      (_, experienceIndex) => experienceIndex !== index
    );

    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        createProject(),
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter(
      (_, projectIndex) => projectIndex !== index
    );

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const handleTechnologyInputChange = (index, value) => {
    setTechnologyInputs({
      ...technologyInputs,
      [index]: value,
    });
  };

  const addTechnology = (projectIndex) => {
    const technology =
      technologyInputs[projectIndex]?.trim();

    if (!technology) {
      return;
    }

    const project = formData.projects[projectIndex];

    if (project.technologies.includes(technology)) {
      return;
    }

    const updatedProjects = [...formData.projects];

    updatedProjects[projectIndex] = {
      ...project,
      technologies: [
        ...project.technologies,
        technology,
      ],
    };

    setFormData({
      ...formData,
      projects: updatedProjects,
    });

    setTechnologyInputs({
      ...technologyInputs,
      [projectIndex]: "",
    });
  };

  const removeTechnology = (
    projectIndex,
    technologyIndex
  ) => {
    const project = formData.projects[projectIndex];

    const updatedTechnologies =
      project.technologies.filter(
        (_, index) => index !== technologyIndex
      );

    const updatedProjects = [...formData.projects];

    updatedProjects[projectIndex] = {
      ...project,
      technologies: updatedTechnologies,
    };

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const handleCertificationChange = (
    index,
    field,
    value
  ) => {
    const updatedCertifications = [
      ...formData.certifications,
    ];

    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        createCertification(),
      ],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications =
      formData.certifications.filter(
        (_, certificationIndex) =>
          certificationIndex !== index
      );

    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    const name = formData.personalInfo.name.trim();
    const email = formData.personalInfo.email.trim();
    const phone = formData.personalInfo.phone.trim();

    if (!title || !name || !email || !phone) {
      setError(
        "Please fill in Resume Title, Name, Email and Phone."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      await createResume(formData);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while creating your resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto mb-8 max-w-5xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase text-blue-600">
          Resume Builder
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Create Your Resume
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Add your details and build a professional resume.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <Section
          title="Resume Details"
          description="Give your resume a title and choose a template."
        >
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Resume Title *
            </label>

            <input
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Full Stack Developer Resume"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Choose Resume Template
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:overflow-x-auto w-full">
              {["classic", "Modern" , "Minimal"].map(
                (templateName) => (
                  <button
                    key={templateName}
                    type="button"
                    onClick={() =>
                      handleTemplateChange(templateName)
                    }
                    className={`rounded-xl border-2 p-6 text-center transition ${
                      formData.template === templateName
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-slate-100">
                      <span className="text-sm font-medium text-slate-500">
                        {templateName} preview
                      </span>
                    </div>

                    <h3 className="font-semibold capitalize text-slate-900">
                      {templateName}
                    </h3>

                    {formData.template ===
                      templateName && (
                      <p className="mt-2 text-xs font-medium text-blue-600">
                        Selected
                      </p>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </Section>

        <Section
          title="Personal Information"
          description="Tell us about yourself."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Full Name *"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.personalInfo.name}
              onChange={handlePersonalInfoChange}
            />

            <Input
              label="Email Address *"
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formData.personalInfo.email}
              onChange={handlePersonalInfoChange}
            />

            <Input
              label="Phone Number *"
              type="tel"
              name="phone"
              placeholder="e.g. +91 9876543210"
              value={formData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />

            <Input
              label="Location"
              name="location"
              placeholder="e.g. Delhi, India"
              value={formData.personalInfo.location}
              onChange={handlePersonalInfoChange}
            />

            <div className="md:col-span-2">
              <Input
                label="Profile Picture URL"
                name="profilePic"
                placeholder="https://example.com/profile.jpg"
                value={formData.personalInfo.profilePic}
                onChange={handlePersonalInfoChange}
              />

              <p className="mt-1 text-xs text-slate-400">
                You can add image upload later using Cloudinary.
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Career Objective"
          description="Briefly describe your career goals."
        >
          <textarea
            rows="4"
            value={formData.careerGoal}
            onChange={handleCareerGoalChange}
            placeholder="Example: Motivated Full Stack Developer looking for an opportunity to build scalable and user-friendly web applications."
            className={textareaStyle}
          />
        </Section>

        <Section
          title="Skills"
          description="Add your technical and professional skills."
        >
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addSkill();
                }
              }}
              placeholder="e.g. React.js"
              className={inputStyle}
            />

            <AddButton onClick={addSkill} />
          </div>

          <Tags
            items={formData.skills}
            onRemove={removeSkill}
          />
        </Section>

        <Section
          title="Education"
          description="Add your educational background."
        >
          {formData.education.map(
            (education, index) => (
              <div
                key={index}
                className="mb-5 rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    Education {index + 1}
                  </h3>

                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(index)
                      }
                      className="text-sm font-medium text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    value={education.degree}
                    placeholder="Degree e.g. BCA"
                    onChange={(event) =>
                      handleEducationChange(
                        index,
                        "degree",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    value={education.institution}
                    placeholder="Institution / University"
                    onChange={(event) =>
                      handleEducationChange(
                        index,
                        "institution",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    type="number"
                    value={education.startYear}
                    placeholder="Start Year e.g. 2022"
                    onChange={(event) =>
                      handleEducationChange(
                        index,
                        "startYear",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    type="number"
                    value={education.endYear}
                    placeholder="End Year e.g. 2025"
                    onChange={(event) =>
                      handleEducationChange(
                        index,
                        "endYear",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            )
          )}

          <AddButton onClick={addEducation} />
        </Section>

        <Section
          title="Work Experience"
          description="Add your professional work experience."
        >
          {formData.experience.map(
            (experience, index) => (
              <div
                key={index}
                className="mb-5 rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    Experience {index + 1}
                  </h3>

                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(index)
                      }
                      className="text-sm font-medium text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    value={experience.company}
                    placeholder="Company Name"
                    onChange={(event) =>
                      handleExperienceChange(
                        index,
                        "company",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    value={experience.position}
                    placeholder="Position e.g. Frontend Developer"
                    onChange={(event) =>
                      handleExperienceChange(
                        index,
                        "position",
                        event.target.value
                      )
                    }
                  />

                  <DateField
                    label="Start Date"
                    value={experience.startDate}
                    onChange={(event) =>
                      handleExperienceChange(
                        index,
                        "startDate",
                        event.target.value
                      )
                    }
                  />

                  <DateField
                    label="End Date"
                    value={experience.endDate}
                    onChange={(event) =>
                      handleExperienceChange(
                        index,
                        "endDate",
                        event.target.value
                      )
                    }
                  />

                  <textarea
                    rows="4"
                    value={experience.description}
                    onChange={(event) =>
                      handleExperienceChange(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Describe your responsibilities and achievements..."
                    className={`${textareaStyle} md:col-span-2`}
                  />
                </div>
              </div>
            )
          )}

          <AddButton onClick={addExperience} />
        </Section>

        <Section
          title="Projects"
          description="Add projects that showcase your skills."
        >
          {formData.projects.map((project, index) => (
            <div
              key={index}
              className="mb-5 rounded-xl border border-slate-200 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">
                  Project {index + 1}
                </h3>

                {formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeProject(index)
                    }
                    className="text-sm font-medium text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <Field
                  value={project.name}
                  placeholder="Project Name e.g. YouTube Clone"
                  onChange={(event) =>
                    handleProjectChange(
                      index,
                      "name",
                      event.target.value
                    )
                  }
                />

                <textarea
                  rows="4"
                  value={project.description}
                  onChange={(event) =>
                    handleProjectChange(
                      index,
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe your project..."
                  className={textareaStyle}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Technologies
                  </label>

                  <div className="flex gap-2">
                    <input
                      value={
                        technologyInputs[index] || ""
                      }
                      onChange={(event) =>
                        handleTechnologyInputChange(
                          index,
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addTechnology(index);
                        }
                      }}
                      placeholder="e.g. React"
                      className={inputStyle}
                    />

                    <AddButton
                      onClick={() =>
                        addTechnology(index)
                      }
                    />
                  </div>

                  <Tags
                    items={project.technologies}
                    onRemove={(technologyIndex) =>
                      removeTechnology(
                        index,
                        technologyIndex
                      )
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    type="url"
                    value={project.projectUrl}
                    placeholder="Project URL"
                    onChange={(event) =>
                      handleProjectChange(
                        index,
                        "projectUrl",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    type="url"
                    value={project.githubUrl}
                    placeholder="GitHub URL"
                    onChange={(event) =>
                      handleProjectChange(
                        index,
                        "githubUrl",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <AddButton onClick={addProject} />
        </Section>

        <Section
          title="Certifications"
          description="Add your professional certifications."
        >
          {formData.certifications.map(
            (certification, index) => (
              <div
                key={index}
                className="mb-5 rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    Certification {index + 1}
                  </h3>

                  {formData.certifications.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeCertification(index)
                      }
                      className="text-sm font-medium text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    value={certification.name}
                    placeholder="Certification Name"
                    onChange={(event) =>
                      handleCertificationChange(
                        index,
                        "name",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    value={certification.organization}
                    placeholder="Organization / Issuer"
                    onChange={(event) =>
                      handleCertificationChange(
                        index,
                        "organization",
                        event.target.value
                      )
                    }
                  />

                  <DateField
                    label="Issue Date"
                    value={certification.issueDate}
                    onChange={(event) =>
                      handleCertificationChange(
                        index,
                        "issueDate",
                        event.target.value
                      )
                    }
                  />

                  <Field
                    type="url"
                    value={certification.credentialUrl}
                    placeholder="Credential URL"
                    onChange={(event) =>
                      handleCertificationChange(
                        index,
                        "credentialUrl",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            )
          )}

          <AddButton onClick={addCertification} />
        </Section>

        {error && (
          <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:mx-8">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-between sm:p-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Resume..."
              : "Create Resume →"}
          </button>
        </div>
      </form>
    </div>
  );
};

function Section({
  title,
  description,
  children,
}) {
  return (
    <section className="border-b border-slate-200 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>

      <div className="mt-4">{children}</div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input {...props} className={inputStyle} />
    </div>
  );
}

function Field(props) {
  return <input {...props} className={inputStyle} />;
}

function DateField({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-slate-500">
        {label}
      </label>

      <input
        type="date"
        {...props}
        className={inputStyle}
      />
    </div>
  );
}

function AddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
    >
      Add
    </button>
  );
}

function Tags({ items, onRemove }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
        >
          {item}

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="ml-2 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default CreateResume;