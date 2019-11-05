#Component Resource Naming Rules

In LayaAirIDE, images and components are identified as corresponding components by the resource prefix. For example, the name btn_xxx will be recognized as a button, and the name tab_xxx will be recognized as a Tab component.

###Basic Component Naming Rules:

Here are the default component resource correspondence rules for the editor (case-insensitive):

`Label`Component (Text Box): label_xxx;

`TextInput`Components (input box): input_xxx or textinput_xx;

`TextArea`Components (text fields, with scrollbars): area_xxx or textarea_xxx;

`Button`Components (buttons): btn_xxx or button_xxx;

`CheckBox`Components (check boxes): check_xxx or check box_xx;

`Radio`Component (menu box): radio or radio ﹣ XXX;

`Tab`Component (label group): tab_xxx;

`RadioGroup`Component (radio box button group): radiogroup_xxx;

`VSlider`Component (vertical slider): vslider ﹣ XXX;

`HSlider`Component (horizontal slider): hslider_xxx;

`Clip`Component (bitmap slice): clip_xxx;

`ProgressBar`Components (progress bar): progress_xxx or progressbar_xx;

`ComboBox`Components (drop-down box): combo_xxx or combobox_xx;

`VScrollBar`Components (vertical scrollbar): vscroll_xxx or vscrollbar_xxx;

`HScrollBar`Component (horizontal scrollbar): hscroll_xxx or hscrollbar_xxx;

`Image`Components (graphics components): image_xxx;

Not all of the above rules will be recognized as Sprite.

The following is a sample component picture:

![1](img\1.png)(Fig. 1)

The corresponding display in resource manager is as follows:

![2](img\2.png)(Fig. 2)



###Special components:

Special components need to be composed of multiple pictures. Naming rules add $to distinguish them based on the above rules. There are three main components: ScrollBar, ProgressBar, Slider.

The naming rules for special components are shown in the following figure:

![3](img\3.png)(图3)



![4](img\4.png)(Fig. 4)

![5](img\5.png)(Fig. 5)



###Container components

Container components (Box, List, Tab, RadioGroup, ViewStack, Panel, HBox, VBox, Tree) do not need corresponding resources by default and can be converted by shortcut key Ctrl+B. As shown in the figure below:

![6](img\6.png)(图6)



