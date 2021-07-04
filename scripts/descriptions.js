/*
   Author:  Ruksmita
   Filename: p2.js

  The purpose of this file is to create and hold the descriptions associated with
  the respective menu options of the Concepts menu.

  This file is temporarily being implemented due to the development process being mainly
  performed and tested off-server and with the primary aim of bypassing the CORS policy
  of web browsers preventing the loading of local files.

  Following the next stage of the project, P3, where access to the server will be more mainstream,
  the proper changes will be implemented to convert this file to a JSON which will then be queried
  through the server to display the descriptions.

*/
const descriptions = {
  "local conditions": {
    title: "Local Conditions:",
    paragraphs: [
      "Heating demand is a given in heating degree-days. The length of a Canadian heating season is the number " +
        "of days below 18&deg;C. Coldness is the difference between a desired indoor temeparture of 20&deg;C and " +
        "the average outdoor temperature on those days.",
      "Humidy and especially windliness of a location also add to heating demand but are discussed elsewhere.",
      "Warmer climates imply a cooling load: also a subject for other chapters",
      "Please note that to refect the Canadian experience, this App mixes units: Celsius for temperature, for example, " +
        "but inches and feet for dimensions.",
    ],
  },

  "annual energy budget": {
    title: "Annual Energy Budget",
    paragraphs: [
      "Envelope heat loss is only part of an energy budget. Lights, hot water appliances and electronics also consume energy. " +
        "In this chapter those other loads are fixed, on the assumption that use of the building remains constant in all locations.",
      "Envelope heat loss has at least two components: the effectively conductive losses that can be reduced by insulation, and losses " +
        "due to ventilation and drafts. Both are proportional to heating demand. Looking at the Energy Budget graph, you will see that " +
        "changing the insulation levels changes the conductive or insulation losses but not those due to air movement.",
    ],
  },

  "drafts and ventilation": {
    title: "Drafts and Ventilation",
    paragraphs: [
      "Realistically, a larger window would admit more drafts, especially at the lower end of the quality scale, but that effect " +
        "is ignored in the insulation chapter.",
      "The Drafts and Ventilation chapter explains how energy losses due to infiltration are controlled by membranes, sealants, " +
        "joint design, and meticulous quality control. It shows how ventilation losses can be managed through heat exchange, flow " +
        "controls, and careful use of operable windows and vents.",
    ],
  },

  "insulation and heat loss": {
    title: "Insulation and Heat Loss",
    paragraphs: [
      "In North America. thermal resistance is measured in R-Values. The resistance of a material barrier is a product of its " +
        "resistivity, in R/inch, and the inches of thickness. The actual effectiveness of insulation depends on installation and " +
        "other factors, but this app gives drywall an R/inch of 1, fiberglass and cellulose insulation an R/Inch of 3, and urethane " +
        "spray foam an R/inch of 6.",
      "In thin and poorly insulating assemblies, air films become significant. This is how painted sheet steel ends up with a " +
        "nominal R of 1. When assemblies are layered, R values can simply be totalled.",
    ],
  },

  "materials and insulation": {
    title: "Materials and Insulation",
    paragraphs: [
      "Heat flow is inversely related to thermal resistance. The conduction of heat through a matenal is given as a U value, " +
        "which is equal to 1/R. Add layers into a single R value before finding their U value.",
      "Heat loss is a product of thermal demand and conductive liability. Thermal demand consolidates temperature difference " +
        "and time, as in degree days. Thermal liability is a product of surface area and conductance.",
      "The total thermal liability of an envelope is a sum of the liability of its portions. Average conductance divides the " +
        "total liability by the total area. The effective R-value of an envelope is the inverse of average conductance.",
      "Note that high R-value portions of an envelope have a smaller effect on the effective R-value than might be supposed. " +
        "Conversely, low-R-value portions of an envelope such as windows have a larger effect on overall heat loss than their small " +
        "area may suggest.",
    ],
  },

  "environmental impact": {
    title: "Environmental Impact",
    paragraphs: [
      "The environmental impact of construction depends not only on the energy consumed in operating a building, but in the " +
        "energy consumed or 'embodied' in the material through sourcing, manufacture, transport, and assembly. Additionally, " +
        "toxins and other ecological and social injuries need to be accounted for. The exact calculations are complicated and debatable, " +
        "but that's no reason to ignore them. They are the subject of several other chapters.",
    ],
  },
};
