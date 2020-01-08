import * as THREE from "three";
import { add } from "../utils/three";

export default ({
	parent,
	world,
	dynamic = true,
	x = 0,
	y = 0,
	z = 0,
    a = THREE.Vector3(30, 30, 30),
    b = THREE.Vector3(40, 40, 40),
    c = THREE.Vector3(50, 50, 50),
	scale = 1,
	color = 0x0fe61f,
	opacity = 1,
}) => {
	const geometry = new THREE.Triangle(a, b, c);
	const material = new THREE.MeshStandardMaterial({ color, transparent: opacity < 1, opacity, flatShading: true });
	const triangle = new THREE.Mesh(geometry, material);

	triangle.position.x = x;
	triangle.position.y = y;
	triangle.position.z = z;
	triangle.scale.x = scale;
	triangle.scale.y = scale;
	triangle.scale.z = scale;

	add(parent, triangle);

	return {
		model: triangle,
		bodies: [
			world.add({
				type: "triangle",
				pos: [x, y, z],
				rot: [0, 0, 0],
				move: dynamic,
				density: 0.1,
				friction: 0.9,
				restitution: 0.2,
				belongsTo: 1,
				collidesWith: 0xffffffff
			})
		],
		removable: (frustum, self) => !frustum.intersectsObject(self.model)
	};
};
