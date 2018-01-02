# LayaAir IDE component library

### 1. Overview of component lists

The component library of LayaAirIDE contains the commonly used components of IDE: 2D basic components, Graphics vector, common and several categories. As shown in Figure 1, figure 2 and figure 3.

![图1](img/1.png) <br />

(Figure 1) 2D base components

![图2](img/2.png) <br />

(Figure 2) Graphics vector components

![图3](img/3.png) <br />

(Figure 3) UI common components



### 2. The difference between the component library and the resource manager

#### 2.1 storage location difference

All the components in the component library are stored in the directory in the LayaAirIDE location, which belongs to the shared components of all projects.

The components in the resource manager are stored in the project's directory, only for the current project.

#### 2.2 Skin difference

The components stored in the component library are by default without skin. Place the scene editor and manually set the skin as needed.

In the resource manager, the component skin resource is stored. After the scene editor is placed, the corresponding components are identified by the prefix of the resource, and the resource is taken as the component skin resource.

#### 2.3 Component Type Differences

The component library includes the UI component, the Graphics vector component, and the 2D base (display object) component.

Only UI components are stored in the resource manager.



### 3. Document reference for other components

You can also store and display custom components in the component library. For custom components you can refer to the `《Creating and Using Custom Components》` using  the ` IDE authoring category`.



The presentation of each component in the component library is described in detail in `《Attribute Setter Documentation》`. ` The design pattern base` come with a detailed classification of the `IDE component properties`.


`The resource manager document` also has an introduction to UI components, such as nomenclature naming rules, related to the introduction of the `《resource manager introduction》` in the `design pattern base classification`.



