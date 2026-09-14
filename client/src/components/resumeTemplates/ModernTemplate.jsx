import React from "react";

const ModernTemplate = ({ data }) => {
    const personalInfo = data.personalInfo;

    return (
        <div className="mx-auto max-w-4xl overflow-hidden bg-white shadow-xl">

            {/* Header */}
            <div className="bg-blue-600 px-8 py-10 text-white">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                    {personalInfo.profilePic && (
                        <img
                            src={personalInfo.profilePic}
                            alt="Profile"
                            className="h-28 w-28 rounded-2xl border-4 border-white object-cover"
                        />
                    )}

                    <div>
                        <h1 className="text-4xl font-bold">
                            {personalInfo.name}
                        </h1>

                        <p className="mt-2 text-xl text-blue-100">
                            {data.title}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-100">
                            {personalInfo.email && <span>{personalInfo.email}</span>}
                            {personalInfo.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo.location && <span>{personalInfo.location}</span>}
                        </div>
                    </div>

                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3">

                {/* Sidebar */}
                <aside className="bg-slate-50 p-6 md:col-span-1">

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                                Skills
                            </h2>

                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
                                    >
                                        {skill}
                                    </div>
                                ))}
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
                                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                                    Certifications
                                </h2>

                                <div className="space-y-5">
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
                                                <h3 className="font-semibold text-slate-800">
                                                    {certificate.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {certificate.organization}
                                                </p>

                                                {certificate.credentialUrl && (
                                                    <a
                                                        href={certificate.credentialUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-1 inline-block text-xs text-blue-600 hover:underline"
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
                </aside>

                {/* Main Content */}
                <main className="p-8 md:col-span-2">

                    {/* Career Objective */}
                    {data.careerGoal && (
                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-bold text-slate-900">
                                Profile
                            </h2>

                            <div className="h-1 w-12 bg-blue-600"></div>

                            <p className="mt-4 leading-7 text-slate-600">
                                {data.careerGoal}
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
                            <section className="mb-8">
                                <h2 className="mb-3 text-xl font-bold text-slate-900">
                                    Experience
                                </h2>

                                <div className="h-1 w-12 bg-blue-600"></div>

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
                                            <div
                                                key={experience._id}
                                                className="relative border-l-2 border-blue-200 pl-5"
                                            >
                                                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-blue-600"></div>

                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {experience.position}
                                                </h3>

                                                <p className="font-medium text-blue-600">
                                                    {experience.company}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    {experience.startDate || ""}
                                                    {experience.endDate &&
                                                        ` - ${experience.endDate}`}
                                                </p>

                                                {experience.description && (
                                                    <p className="mt-3 leading-6 text-slate-600">
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
                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-bold text-slate-900">
                                Education
                            </h2>

                            <div className="h-1 w-12 bg-blue-600"></div>

                            <div className="mt-5 space-y-5">
                                {data.education.map((education) => (
                                    <div key={education._id}>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {education.degree}
                                        </h3>

                                        <p className="font-medium text-blue-600">
                                            {education.institution}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-400">
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
                                <h2 className="mb-3 text-xl font-bold text-slate-900">
                                    Projects
                                </h2>

                                <div className="h-1 w-12 bg-blue-600"></div>

                                <div className="mt-5 space-y-5">
                                    {data.projects.map((project) => {
                                        if (
                                            !project.name &&
                                            !project.description
                                        ) {
                                            return null;
                                        }

                                        return (
                                            <div
                                                key={project._id}
                                                className="rounded-xl border border-slate-200 p-5"
                                            >
                                                <h3 className="text-lg font-semibold text-slate-800">
                                                    {project.name}
                                                </h3>

                                                {project.description && (
                                                    <p className="mt-2 leading-6 text-slate-600">
                                                        {project.description}
                                                    </p>
                                                )}

                                                {project.technologies?.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {project.technologies.map(
                                                            (technology, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                                                                >
                                                                    {technology}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}

                                                <div className="mt-4 flex gap-4">
                                                    {project.projectUrl && (
                                                        <a
                                                            href={project.projectUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-sm font-medium text-blue-600 hover:underline"
                                                        >
                                                            Live Project
                                                        </a>
                                                    )}

                                                    {project.githubUrl && (
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-sm font-medium text-slate-600 hover:underline"
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

                </main>
            </div>
        </div>
    );
};

export default ModernTemplate;