<?php

class Photo implements JsonSerializable
{
    private $id;

    private $date;

    private $width;

    private $height;

    private $path;

    private $collection_id;


    public function __construct(int $id, string $date, int $width, int $height, string $path, int $collection_id) {
        $this->id = $id;
        $this->date = $date;
        $this->width = $width;
        $this->height = $height;
        $this->path = $path;
        $this->collection_id = $collection_id;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getDate(): string {
        return $this->date;
    }

    public function getWidth(): string {
        return $this->width;
    }
    public function getHeight(): string {
        return $this->height;
    }

    public function getPath(): string {
        return $this->path;
    }

    /**
     * @return int
     */
    public function getCollectionId(): int
    {
        return $this->collection_id;
    }

    public function jsonSerialize(): array {
        return get_object_vars($this);
    }

    public static function createFromAssoc(array $assocPhoto): Photo {
        return new Photo($assocPhoto['id'], $assocPhoto['date'], $assocPhoto['width'], $assocPhoto['height'], $assocPhoto['path'], $assocPhoto['collection_id']);
    }
}