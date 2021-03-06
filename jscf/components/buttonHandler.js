
/***************************
	Button Handler component.
***************************/

const __BUTTON_HANDLER_NAME = "[builtin_button_handler]";
const __BUTTON_HANDLER_HOVER_SPEED = 1.1;
const __BUTTON_HANDLER_HOVER_MAX = 1.5;

function ButtonHandler(owner, speed)
{
	this.name = __BUTTON_HANDLER_NAME;
	this.parent = owner;
	this.hover_speed = speed ? speed : __BUTTON_HANDLER_HOVER_SPEED;
	this.pressed = false;

	this.update = function()
	{
		var transform = owner.getGlobalTransform();
		this.bb.setTransform(transform);

		var mx = owner.game.inputManager.getMouseX();
		var my = owner.game.inputManager.getMouseY();
		var mDown = owner.game.inputManager.IsMouseDown();

		if (this.bb.containsPoint(mx, my)) {
			if (transform.scale.length() < __BUTTON_HANDLER_HOVER_MAX)
				owner.transform.scale.scalarMul(this.hover_speed);

			if (mDown)
				this.pressed = true;
		} else {
			owner.transform.scale = new Vector2d(1, 1);
		}

		if (this.pressed && !mDown) {
			this.pressed = false;
			this.onClick();
		}
	};

	this.onClick = function()
	{
		console.log("[JSCF][ButtonHandler] button press");
	};

	this.init = function()
	{
		// set bounding box
		var shape = owner.getShapeByChild();
		var transform = owner.getGlobalTransform();
		this.bb = new AABB(transform, transform, shape.x, shape.y);
	};

	this.init();

}

ButtonHandler.component_name = __BUTTON_HANDLER_NAME;
