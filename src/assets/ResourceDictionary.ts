import Resource from "@/assets/Resource";
import backgrounds from "@/assets/backgrounds";
import wooden_house from "@/assets/wooden_house";
import western_house from "@/assets/western_house";

export default class ResourceDictionary {
    private readonly resources: Map<string, Resource>;

    constructor() {
        this.resources = new Map<string, Resource>();
        this.saveResources();
    }

    loadResource(resourceId: string): Resource {
        const resource = this.resources.get(resourceId);
        if (!resource) throw new Error("resource_doesnt_exists");

        return resource;
    }

    getBackgrounds(): Array<Resource> {
        return backgrounds;
    }

    getWesternHouses(): Array<Resource> {
       return western_house;
    }

    getWoodenHouses(): Array<Resource> {
      return wooden_house
    }

    saveResources(): void {
        western_house.forEach((western_house: Resource) => this.resources.set(western_house.id, western_house));
        wooden_house.forEach((wooden_house: Resource) => this.resources.set(wooden_house.id, wooden_house));
        backgrounds.forEach((background: Resource) => this.resources.set(background.id, background))
    }
}