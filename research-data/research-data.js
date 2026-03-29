window.researchData = {
  topics: [
    "Optimal Control",
    "Nonlinear Dynamics",
    "Data-driven Learning",
    "Robotics",
    "Koopman Operator Theory",
    "Flight dynamics",
  ],

  publications: [
    //----------------------------------------------------------------//
    {
      id: "flapping-wing-directional-maneuver-aiaa-2025",
      title:
        "Actuator System for Directional Manoeuvre of a Flapping Wing Aerial Vehicle",
      category: "conference",
      showOnHome: true,
      meta: "AIAA SciTech - 2025",
      authors:
        "Neeraj Balachandar, Yashwanth M, Akash M, Mahathi Kesavan and Vishnu Rajasekharan Unni",
      actions: [
        {
          title: "Paper",
          href: "https://doi.org/10.2514/6.2025-1461",
          background: "#f2d8dc",
          color: "#1f2b35",
        },
      ],
    },
    //----------------------------------------------------------------//
    {
      id: "development-four-DOF-training-rig-2026",
      title:
        "Development of Four DOF Training Rig for Learning Control Stratergies in UAVs",
      category: "journal",
      showOnHome: true,
      meta: "Ongoing",
      authors: "Yashwanth M, Neeraj Balachandar, Dhinesan SK, Akhin",
      // actions: [
      //   {
      //     title: "Paper",
      //     href: "#",
      //     background: "#f2d8dc",
      //     color: "#1f2b35",
      //   },
      //   {
      //     title: "Project",
      //     href: "#",
      //     background: "#dceddf",
      //     color: "#1f2b35",
      //   },
      // ],
    },
    //----------------------------------------------------------------//
    {
      id: "from-measurements-to-markovgraphs-clustering-dynamical-system-2026",
      title:
        "From Measurements to Markov Graphs: Clustering-Based Framework for Dynamical Systems",
      category: "journal",
      showOnHome: false,
      meta: "Ongoing",
      authors:
        "Yashwanth M, Ashik Lal Krishna, Niranjan S. Ghaisas,Sumohana S. Channappayya, and Vishnu R. Unni",
      // actions: [
      //   {
      //     title: "Paper",
      //     href: "#",
      //     background: "#f2d8dc",
      //     color: "#1f2b35",
      //   },
      //   {
      //     title: "Project",
      //     href: "#",
      //     background: "#dceddf",
      //     color: "#1f2b35",
      //   },
      // ],
    },
    //----------------------------------------------------------------//
    {
      id: "indian-patent-565068-em-wave-array-control",
      title:
        "A System and Method for Controlling State of Array of Coherent Sources of Electromagnetic Waves",
      category: "patent",
      showOnHome: false,
      meta: "Indian Patent Office - Patent No. 565068 - Granted to IIT Hyderabad",
      authors:
        "Yashwanth Mohan Kumar, Harishankar Manoharan, Vishnu Rajasekharan Unni, and Nithyanandan Kanagaraj",
      actions: [
        // {
        //   title: "Patent",
        //   href: "#",
        //   background: "#f2d8dc",
        //   color: "#1f2b35",
        // },
      ],
    },
    //----------------------------------------------------------------//
  ],

  projects: [
    //----------------------------------------------------------------//
    {
      slug: "flapping-wing-actuation-2025",
      title: "Flapping Wing Actuation",
      meta: "Aerial Robotics",
      showOnHome: false,
      status: "Past",
      tileMedia: "./research-data/Directional_Maneuver.png",
      // description:
      //   "A project page template for your flapping wing vehicle work, with room for media, methodology, and related publications.",
      actions: [
        {
          title: "Open Project",
          href: "./project.html?slug=flapping-wing-actuation",
          background: "#dce8f6",
          color: "#1f2b35",
        },
        {
          title: "Paper",
          href: "#",
          background: "#f2d8dc",
          color: "#1f2724",
        },
      ],
      detail: {
        // summary:
        //   "Use this page to describe the control, actuation, simulation, and experiments behind the flapping wing platform in more depth.",
        mediaSrc: "./research-data/Directional_Maneuver.png",
        mediaAlt:
          "Directional maneuver preview for the flapping wing actuation project",
        mediaLabel:
          "Replace this area later with an image, animated GIF, or embedded video preview for the project.",
        links: [
          // {
          //   title: "Paper",
          //   href: "#",
          //   background: "#f2d8dc",
          //   color: "#1f2b35",
          // },
          // {
          //   title: "Video",
          //   href: "#",
          //   background: "#dceddf",
          //   color: "#1f2724",
          // },
        ],
        sections: [
          {
            heading: "Overview",
            text: "In this project we present the design and analysis of a six-bar mechanism for a flapping-wing aerial vehicle capable of generating the asymmetric flapping motion required for the vehicle’s directional maneuver. A low-fidelity Vortex Particle Method is used to simulate the flapping dynamics, estimating lift and drag forces at various time steps. These computational results are validated against experimental measurements by measuring forces along different axes. State space analysis of forces generated indicates that the methodology that was introduced for directional control is indeed effective.",
          },
          {
            heading: "Method",
            text: "We utilize modified-vortex particle based apporach for simulating the flapping flight. The mean position of one of the wing was changed to create asymmetric flapping and the corresponding kinematics were obtained by mathematically modeling the six-bar mechanism. The forces and moments generated at the COM of the flapping bird was estimated and the same was validated qualitatively against experimental measurments. An physical micro-scale winged six-bar mechanism was fabricated and the forces were estimated using a custom made load-cell setup.",
          },
          {
            heading: "Results",
            text: "The work concludes that assymmetric flapping generated unbalanced loads suting directional maneuvers for micro-scale flapping wing mechanisms.",
          },
        ],
        relatedPublications: ["flapping-wing-directional-maneuver-aiaa-2025"],
      },
    },
    //----------------------------------------------------------------//
    {
      slug: "measurments-to-markov-graph-2026",
      title: "Measurements to Markov Graph",
      meta: "Data-driven Modeling",
      showOnHome: true,
      status: "Ongoing",
      tileMedia: "./research-data/Measurements_to_Markov_Graphs.png",
      // description:
      //   "This section works well for thesis projects, group efforts, prototypes, or deployed tools.",
      actions: [
        {
          title: "Open Project",
          href: "./project.html?slug=measurments-to-markov-graph-2026",
          background: "#dceddf",
          color: "#1f2b35",
        },
      ],
      detail: {
        // summary:
        //   "This is a second project template. Replace it with another real project whenever you are ready.",
        mediaSrc: "./research-data/Measurements_to_Markov_Graphs_1.png",
        mediaAlt: "Measurements to Markov Graphs Project",
        links: [
          // {
          //   title: "Repo",
          //   href: "#",
          //   background: "#f2d8dc",
          //   color: "#1f2b35",
          // },
        ],
        sections: [
          {
            heading: "Problem",
            text: "Real world systems are typically high-dimensional and require large number of evaluations due to varied operating conditions. Additionally, the data available for such systems are insufficient and noisy. In such a setting we inquire how do we characterize performance of the system under different operating conditions? how can we reduce the computationl burden of large number of evaluations required?",
          },
          {
            heading: "Approach",
            text: "We employ analyse the high-dimensional system as a combination of subsystems. The state subsystem embeded state trajectories are then used to identify clusters (modes) of the subsystem that share similar statistics. These clusters is utilized to construct Markov-Graphs which models the subsystem of the high-dimensional nonlinear system.",
          },
        ],
        relatedPublications: [
          "from-measurements-to-markovgraphs-clustering-dynamical-system-2026",
        ],
      },
    },
    //----------------------------------------------------------------//
    {
      slug: "systemidentification-fsi-koopman-2026",
      title: "System Identification of FSI system using Koopman Theory",
      meta: "Data-driven Modeling",
      showOnHome: true,
      status: "Ongoing",
      tileMedia: "./research-data/Koopman_operator_linear_representation.png",
      description:
        "This section works well for thesis projects, group efforts, prototypes, or deployed tools.",
      actions: [
        {
          title: "Open Project",
          href: "./project.html?slug=systemidentification-fsi-koopman-2026",
          background: "#dceddf",
          color: "#1f2b35",
        },
      ],
      detail: {
        summary:
          "This is a second project template. Replace it with another real project whenever you are ready.",
        mediaSrc: "./research-data/Koopman_operator_linear_representation.png",
        mediaAlt: "Measurements to Markov Graphs Project",
        links: [
          // {
          //   title: "Repo",
          //   href: "#",
          //   background: "#f2d8dc",
          //   color: "#1f2b35",
          // },
        ],
        sections: [
          {
            heading: "Problem",
            text: "Describe the project problem or application domain.",
          },
          {
            heading: "Approach",
            text: "Explain the system design, method, or technical stack.",
          },
        ],
        relatedPublications: [],
      },
    },
    //----------------------------------------------------------------//
    {
      slug: "5dof-uav-trainingrig-learning-control-2026",
      title: "Development of 5DOF UAV Training Rig",
      meta: "Data-driven Modeling",
      showOnHome: false,
      status: "Ongoing",
      tileMedia: "./research-data/5DOF_training_rig.png",
      description:
        "This section works well for thesis projects, group efforts, prototypes, or deployed tools.",
      actions: [
        {
          title: "Open Project",
          href: "./project.html?slug=5dof-uav-trainingrig-learning-control-2026",
          background: "#dceddf",
          color: "#1f2b35",
        },
      ],
      detail: {
        summary:
          "This is a second project template. Replace it with another real project whenever you are ready.",
        mediaSrc: "./research-data/5DOF_training_rig.png",
        mediaAlt: "Measurements to Markov Graphs Project",
        links: [
          // {
          //   title: "Repo",
          //   href: "#",
          //   background: "#f2d8dc",
          //   color: "#1f2b35",
          // },
        ],
        sections: [
          {
            heading: "Problem",
            text: "Describe the project problem or application domain.",
          },
          {
            heading: "Approach",
            text: "Explain the system design, method, or technical stack.",
          },
        ],
        relatedPublications: [],
      },
    },
    //----------------------------------------------------------------//
    {
      slug: "modeling-and-simulating-dynamics-skyhook-2025",
      title: "Modeling and simulating dynamics of Sky-Hook satellite",
      meta: "Rigidbody Dynamics",
      showOnHome: false,
      status: "Past",
      tileMedia: "./research-data/Small_oscillation_sat_1m.mp4",
      description:
        "This section works well for thesis projects, group efforts, prototypes, or deployed tools.",
      actions: [
        {
          title: "Open Project",
          href: "./project.html?slug=modeling-and-simulating-dynamics-skyhook-2025",
          background: "#dceddf",
          color: "#1f2b35",
        },
      ],
      detail: {
        summary:
          "This is a second project template. Replace it with another real project whenever you are ready.",
        mediaSrc: "./research-data/Small_oscillation_sat_1m.mp4",
        mediaAlt: "Sky-hook Satellite Dynamics",
        links: [
          {
            title: "Git Repo",
            href: "https://github.com/YashwanthProfile/Skyhook_Satellite_Sim.git",
            background: "#f2d8dc",
            color: "#1f2b35",
          },
          {
            title: "Open Slides",
            href: "./research-data/Sky_Hook_Project_PPT_Spacecraft_Dynamics_2025.pdf",
            background: "#dce8f6",
            color: "#1f2b35",
          },
        ],
        sections: [
          {
            heading: "Problem",
            text: "Describe the project problem or application domain.",
          },
          {
            heading: "Approach",
            text: "Explain the system design, method, or technical stack.",
          },
        ],
        relatedPublications: [],
      },
    },
    //----------------------------------------------------------------//
  ],
};
