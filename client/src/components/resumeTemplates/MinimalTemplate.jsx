import React from "react";

const MinimalTemplate = ({ data }) => {
    const personalInfo = data.personalInfo;

    return (
        <div className="mx-auto max-w-4xl bg-white px-8 py-10 shadow-xl sm:px-12">

            {/* Header */}
            <header className="border-b border-slate-300 pb-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    {personalInfo.profilePic && (
                        <img
                            src={personalInfo.profilePic}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    )}

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            {personalInfo.name}
                        </h1>

                        <p className="mt-1 text-lg text-slate-500">
                            {data.title}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                            {personalInfo.email && (
                                <span>{personalInfo.email}</span>
                            )}

                            {personalInfo.phone && (
                                <span>{personalInfo.phone}</span>
                            )}

                            {personalInfo.location && (
                                <span>{personalInfo.location}</span>
                            )}
                        </div>
                    </div>

                </div>

            </header>

            {/* Resume */}
            <main className="space-y-8 pt-8">

                {/* Career Objective */}
                {data.careerGoal && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                            Profile
                        </h2>

                        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                            {data.careerGoal}
                        </p>
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                            Skills
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            {data.skills.join(" • ")}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.some(
                    (item) =>
                        item.company ||
                        item.position ||
                        item.description
                ) && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                                Experience
                            </h2>

                            <div className="mt-5 space-y-6">
                                {data.experience.map((experience) => {
                                    if (
                                        !experience.company &&
                                        !experience.position &&
                                        !experience.description
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <div key={experience._id}>
                                            <div className="flex flex-col justify-between sm:flex-row">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">
                                                        {experience.position}
                                                    </h3>

                                                    <p className="text-slate-600">
                                                        {experience.company}
                                                    </p>
                                                </div>

                                                <p className="mt-1 text-sm text-slate-400 sm:mt-0">
                                                    {experience.startDate || ""}
                                                    {experience.endDate &&
                                                        ` - ${experience.endDate}`}
                                                </p>
                                            </div>

                                            {experience.description && (
                                                <p className="mt-2 leading-6 text-slate-600">
                                                    {experience.description}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                {/* Education */}
                {data.education?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                            Education
                        </h2>

                        <div className="mt-5 space-y-5">
                            {data.education.map((education) => (
                                <div key={education._id}>
                                    <h3 className="font-semibold text-slate-900">
                                        {education.degree}
                                    </h3>

                                    <p className="text-slate-600">
                                        {education.institution}
                                    </p>

                                    <p className="text-sm text-slate-400">
                                        {education.startYear} - {education.endYear}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects?.some(
                    (project) =>
                        project.name ||
                        project.description
                ) && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                                Projects
                            </h2>

                            <div className="mt-5 space-y-5">
                                {data.projects.map((project) => {
                                    if (
                                        !project.name &&
                                        !project.description
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <div key={project._id}>
                                            <h3 className="font-semibold text-slate-900">
                                                {project.name}
                                            </h3>

                                            {project.description && (
                                                <p className="mt-2 leading-6 text-slate-600">
                                                    {project.description}
                                                </p>
                                            )}

                                            {project.technologies?.length > 0 && (
                                                <p className="mt-2 text-sm text-slate-500">
                                                    <span className="font-medium">
                                                        Technologies:
                                                    </span>{" "}
                                                    {project.technologies.join(", ")}
                                                </p>
                                            )}

                                            <div className="mt-2 flex gap-4 text-sm">
                                                {project.projectUrl && (
                                                    <a
                                                        href={project.projectUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-slate-700 hover:underline"
                                                    >
                                                        Live Project
                                                    </a>
                                                )}

                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-slate-700 hover:underline"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                {/* Certifications */}
                {data.certifications?.some(
                    (certificate) =>
                        certificate.name ||
                        certificate.organization ||
                        certificate.credentialUrl
                ) && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                                Certifications
                            </h2>

                            <div className="mt-5 space-y-4">
                                {data.certifications.map((certificate) => {
                                    if (
                                        !certificate.name &&
                                        !certificate.organization &&
                                        !certificate.credentialUrl
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <div key={certificate._id}>
                                            <h3 className="font-semibold text-slate-900">
                                                {certificate.name}
                                            </h3>

                                            <p className="text-slate-600">
                                                {certificate.organization}
                                            </p>

                                            {certificate.credentialUrl && (
                                                <a
                                                    href={certificate.credentialUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-slate-700 hover:underline"
                                                >
                                                    View Certificate
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

            </main>
        </div>
    );
};

export default MinimalTemplate;